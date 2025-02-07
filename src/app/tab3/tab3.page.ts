import { Component } from '@angular/core';
import { CartService } from '/Users/carloshidalgohernandez/ProyectoIntegrador/src/app/services/cart.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  cart: any[] = [];

  constructor(private cartService: CartService, private alertController: AlertController, private router: Router) {}

  goToCheckout() {
    if (this.cart.length > 0) {
      this.router.navigate(['/checkout']);
    } else {
      alert('El carrito está vacío');
    }
  }

  ionViewWillEnter() {
    this.cart = this.cartService.getCart();
  }

  async confirmClearCart() {
    const alert = await this.alertController.create({
      header: 'Vaciar Carrito',
      message: '¿Estás seguro de que deseas vaciar el carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, vaciar',
          handler: () => {
            this.cartService.clearCart();
            this.cart = [];  // Actualizar la vista
            console.log('Carrito vaciado');
          }
        }
      ]
    });
    await alert.present();
  }
}