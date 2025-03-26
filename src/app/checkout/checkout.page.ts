import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

declare let paypal: any; // Declara la variable global de PayPal

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone:false
})
export class CheckoutPage implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce((sum, item) => sum + item.preciomenudeo * item.cantidad, 0);
  }

  ngAfterViewInit() {
    this.loadPaypalScript().then(() => {
      this.renderPaypalButton();
    });
  }

  loadPaypalScript(): Promise<void> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AfgaB210ZrfdnNG37QicLFBzKAZ0q-XHvlszIakX45H98Sm0MiaPSiqVRibAp0raUi_GVNksfitU3e_d&currency=MXN';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  renderPaypalButton() {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2),
              currency_code: 'MXN', // Cambiado a pesos mexicanos
              breakdown: {
                item_total: {
                  value: this.total.toFixed(2),
                  currency_code: 'MXN'
                }
              }
            },
            items: this.cartItems.map(item => ({
              name: item.nombre,
              unit_amount: {
                value: item.preciomenudeo.toFixed(2),
                currency_code: 'MXN'
              },
              quantity: item.cantidad.toString()
            }))
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago realizado con éxito por ' + details.payer.name.given_name + ' en pesos mexicanos');
          this.cartService.clearCart(); // Limpia el carrito tras el pago
          this.router.navigate(['/tabs/tab3']); // Redirige al carrito
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
        alert('Hubo un error al procesar el pago. Intenta de nuevo.');
      }
    }).render('#paypal-button-container');
  }
}