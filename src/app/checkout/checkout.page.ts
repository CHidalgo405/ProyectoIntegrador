import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false,
})
export class CheckoutPage {
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
}
