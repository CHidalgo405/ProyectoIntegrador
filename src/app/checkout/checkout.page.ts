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
    // Asegurarse de que preciomenudeo sea un número
    this.cartItems = this.cartItems.map(item => ({
      ...item,
      preciomenudeo: Number(item.preciomenudeo) || 0 // Convertir a número, 0 si falla
    }));
    this.total = this.cartItems.reduce((sum, item) => sum + item.preciomenudeo * item.cantidad, 0);
    console.log('Cart Items en Checkout:', this.cartItems);
    console.log('Total en Checkout:', this.total);
  }

  ngAfterViewInit() {
    this.loadPaypalScript().then(() => {
      this.renderPaypalButton();
    }).catch(err => {
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
        console.error('Error al cargar el SDK de PayPal');
        reject('Failed to load PayPal script');
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
        // Validar que el total no sea 0
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
        console.log('Pago aprobado:', data);
        return actions.order.capture().then((details: any) => {
          console.log('Detalles del pago:', details);
          alert('Pago realizado con éxito por ' + details.payer.name.given_name);
          this.cartService.clearCart();
          this.router.navigate(['/tabs/tab3']);
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', JSON.stringify(err, null, 2));
        alert('Hubo un error al procesar el pago. Revisa la consola para más detalles.');
      }
    }).render('#paypal-button-container');
  }
}