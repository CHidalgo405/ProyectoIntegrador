import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  products: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

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

        // Verificamos si la respuesta es un array directamente
        if (Array.isArray(response)) {
          this.products = response;
        } else if (response && response.data) {
          // Si la respuesta tiene una propiedad 'data', usamos esa
          this.products = response.data;
        } else {
          this.products = [];
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
}