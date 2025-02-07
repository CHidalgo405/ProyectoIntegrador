import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() {}

  addToCart(product: any) {
    this.cart.push(product);
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
