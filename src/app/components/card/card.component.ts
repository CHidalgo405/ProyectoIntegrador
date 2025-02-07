import { Component, Input, input, OnInit } from '@angular/core';
import { CartService } from '/Users/carloshidalgohernandez/ProyectoIntegrador/src/app/services/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent  implements OnInit {
  @Input() producname!: string;
  @Input() descripcion!: string;
  @Input() precio!: number;

  constructor(private cartService: CartService, private alertController: AlertController) {}

  async addToCart() {
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

  ngOnInit() {}

}