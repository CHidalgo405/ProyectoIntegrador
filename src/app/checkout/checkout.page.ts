import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false
})
export class CheckoutPage implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems = this.cartItems.map(item => ({
      ...item,
      preciomenudeo: Number(item.preciomenudeo) || 0
    }));
    this.total = this.cartItems.reduce((sum, item) => sum + item.preciomenudeo * item.cantidad, 0);
    console.log('Cart Items en Checkout:', this.cartItems);
    console.log('Total en Checkout:', this.total);
  }

  ngAfterViewInit() {
    this.loadPaypalScript()
      .then(() => {
        this.renderPaypalButton();
      })
      .catch((err: unknown) => {
        console.error('Error loading PayPal SDK:', err);
        alert('Error al cargar el SDK de PayPal. Revisa la consola para más detalles.');
      });
  }

  loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AfgaB210ZrfdnNG37QicLFBzKAZ0q-XHvlszIakX45H98Sm0MiaPSiqVRibAp0raUi_GVNksfitU3e_d&currency=MXN';
      script.onload = () => {
        console.log('PayPal SDK cargado exitosamente');
        resolve();
      };
      script.onerror = () => {
        const error = new Error('Failed to load PayPal script');
        console.error('Error al cargar el SDK de PayPal:', error.message);
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  renderPaypalButton() {
    if (!paypal) {
      console.error('PayPal SDK no está definido');
      alert('Error: PayPal SDK no cargó correctamente.');
      return;
    }

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        if (this.total <= 0) {
          console.error('El total es 0 o negativo, no se puede crear la orden');
          alert('Error: El total del carrito es 0. Agrega productos válidos.');
          return Promise.reject('Total inválido');
        }

        const orderData = {
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2),
              currency_code: 'MXN',
              breakdown: {
                item_total: {
                  value: this.total.toFixed(2),
                  currency_code: 'MXN'
                }
              }
            },
            items: this.cartItems.map(item => {
              const unitAmount = Number(item.preciomenudeo) || 0;
              return {
                name: item.nombre || 'Producto sin nombre',
                unit_amount: {
                  value: unitAmount.toFixed(2),
                  currency_code: 'MXN'
                },
                quantity: item.cantidad.toString()
              };
            })
          }]
        };
        console.log('Enviando orden a PayPal:', orderData);
        return actions.order.create(orderData);
      },
      onApprove: (data: any, actions: any) => {
        console.log('Pago aprobado, capturando orden:', data);
        return actions.order.capture().then((details: any) => {
          console.log('Detalles del pago capturado:', details);
          if (details.status === 'COMPLETED') {
            alert('Pago realizado con éxito por ' + details.payer.name.given_name);

            // Preparar datos para el recibo
            const receiptData = {
              user: {
                name: details.payer.name.given_name + ' ' + details.payer.name.surname,
                email: details.payer.email_address
              },
              items: this.cartItems,
              total: this.total,
              date: new Date().toISOString()
            };

            // Limpiar el carrito
            this.cartService.clearCart();

            // Redirigir a /receipt con los datos
            this.router.navigate(['/receipt'], { state: receiptData });
          } else {
            console.error('El pago no se completó correctamente:', details.status);
            alert('El pago no se completó. Estado: ' + details.status);
          }
        }).catch((err: unknown) => {
          console.error('Error al capturar el pago:', err);
          alert('Error al capturar el pago. Revisa la consola para más detalles.');
        });
      },
      onError: (err: unknown) => {
        console.error('Error en el pago:', err);
        alert('Hubo un error al procesar el pago. Revisa la consola para más detalles.');
      },
      onCancel: (data: any) => {
        console.log('Pago cancelado por el usuario:', data);
        alert('Has cancelado el pago.');
      }
    }).render('#paypal-button-container');
  }
}