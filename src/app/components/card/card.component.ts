import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductModalComponent } from '../product-modal/product-modal.component'; // Importa el componente del modal

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() producname!: string;
  @Input() descripcion!: string;
  @Input() precio!: number;
  @Input() imagen!: string; // Nueva propiedad para la imagen

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private modalController: ModalController // Inyecta el ModalController
  ) {}

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

  async openModal() {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
      componentProps: {
        producname: this.producname,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imagen
      }
    });
    return await modal.present();
  }

  ngOnInit() {}
}