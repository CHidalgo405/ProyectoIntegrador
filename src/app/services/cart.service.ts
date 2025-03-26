import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  idproducto: number;
  nombre: string;
  image_url: string;
  preciomenudeo: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Cargar el carrito desde localStorage al iniciar
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.idproducto === product.idproducto);
    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      this.cartItems.push({
        idproducto: product.idproducto,
        nombre: product.nombre,
        image_url: product.image_url || 'https://via.placeholder.com/150',
        preciomenudeo: product.preciomenudeo,
        cantidad: 1
      });
    }
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage(); // Guardar en localStorage
  }

  updateQuantity(itemId: number, cantidad: number) {
    const item = this.cartItems.find(i => i.idproducto === itemId);
    if (item) {
      if (cantidad <= 0) {
        this.removeItem(itemId);
      } else {
        item.cantidad = cantidad;
        this.cartSubject.next([...this.cartItems]);
        this.saveCartToLocalStorage(); // Guardar en localStorage
      }
    }
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.idproducto !== itemId);
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage(); // Guardar en localStorage
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage(); // Guardar en localStorage
  }
}