import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  products: any[] = [];
  allProducts: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  isSearching: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.loading = true;
    this.errorMessage = '';
    console.log('Iniciando carga de productos...');

    this.authService.getProducts().subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Respuesta completa de la API:', response);

        if (Array.isArray(response)) {
          this.allProducts = response;
          this.products = [...this.allProducts];
        } else if (response && response.data) {
          this.allProducts = response.data;
          this.products = [...this.allProducts];
        } else {
          this.products = [];
          this.allProducts = [];
          this.errorMessage = 'No se encontraron productos en la respuesta';
        }

        console.log('Productos asignados:', this.products);
        if (event) {
          event.target.complete();
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar los productos: ' + error.message;
        console.error('Error detallado:', error);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  searchProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // Actualizamos el estado de búsqueda
    this.isSearching = !!searchTerm; // True si hay texto, False si está vacío

    if (!searchTerm) {
      this.products = [...this.allProducts]; // Restauramos todos los productos
      return;
    }

    this.products = this.allProducts.filter(product => {
      return (
        product.nombre.toLowerCase().includes(searchTerm) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm))
      );
    });
  }

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

  async openProductModal(product: any) {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
      componentProps: {
        product: product
      }
    });
    await modal.present();
  }
}