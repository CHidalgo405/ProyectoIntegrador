import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: false,
})
export class ProductModalComponent {
  @Input() producname!: string;
  @Input() descripcion!: string;
  @Input() precio!: number;
  @Input() imagen!: string;

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private alertController: AlertController
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async addToCart(event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento de clic

    const product = {
      name: this.producname,
      description: this.descripcion,
      price: this.precio
    };

    this.cartService.addToCart(product);
    console.log('Producto agregado:', product);

    const alert = await this.alertController.create({
      header: 'Producto Agregado',
      message: `"${product.name}" se ha añadido al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}