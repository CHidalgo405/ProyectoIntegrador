import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

declare var paypal: any; // Declaramos la variable global para PayPal

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false,
})
export class CheckoutPage implements AfterViewInit {
  customer = { name: '', email: '' };
  payment = { cardNumber: '', expiry: '', cvv: '' };
  cart: any[] = [];

  constructor(
    private router: Router, 
    private cartService: CartService, 
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.cart = this.cartService.getCart();
  }

  async processPayment() {
    if (this.cart.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito Vacío',
        message: 'No puedes realizar una compra sin productos en el carrito.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.customer.name && this.customer.email && this.payment.cardNumber && this.payment.expiry && this.payment.cvv) {
      const navigationExtras: NavigationExtras = {
        state: {
          customer: this.customer,
          cart: this.cart
        }
      };
      this.cartService.clearCart();
      this.router.navigate(['/receipt'], navigationExtras);
    } else {
      const alert = await this.alertController.create({
        header: 'Formulario Incompleto',
        message: 'Por favor, completa todos los campos antes de continuar.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngAfterViewInit() {
    this.initPayPal();
  }

  initPayPal() {
    console.log('Inicializando PayPal');
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1.00' // Monto a pagar en la moneda configurada (cambiar si es necesario)
            }
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log('Pago completado con éxito:', order);
        alert('Pago realizado con éxito');
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
        alert('Hubo un error con el pago. Inténtalo de nuevo.');
      }
    }).render('#paypal-button-container'); // Renderiza el botón en el contenedor
  }
}
