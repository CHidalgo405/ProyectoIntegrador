import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: false
})
export class ProductModalComponent {
  @Input() product: any; // Recibimos el producto como input

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private toastController: ToastController,
  ) {}

  async addToCart(product: any) {
    this.cartService.addToCart(product);
    const toast = await this.toastController.create({
      message: `${product.nombre} añadido al carrito exitosamente`,
      duration: 1500,
      position: 'middle',
      cssClass: 'custom-toast' // Clase CSS personalizada
    });
    await toast.present();
  }
  
  dismiss() {
    // Cerrar el modal
    this.modalController.dismiss();
  }
}