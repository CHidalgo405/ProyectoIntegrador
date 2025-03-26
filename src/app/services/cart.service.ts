// cart.service.ts
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
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      // Asegurarse de que preciomenudeo sea un número al cargar desde localStorage
      this.cartItems = this.cartItems.map(item => ({
        ...item,
        preciomenudeo: Number(item.preciomenudeo) // Convertir a número
      }));
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
        preciomenudeo: Number(product.preciomenudeo), // Convertir a número
        cantidad: 1
      });
    }
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage();
  }

  updateQuantity(itemId: number, cantidad: number) {
    const item = this.cartItems.find(i => i.idproducto === itemId);
    if (item) {
      if (cantidad <= 0) {
        this.removeItem(itemId);
      } else {
        item.cantidad = cantidad;
        this.cartSubject.next([...this.cartItems]);
        this.saveCartToLocalStorage();
      }
    }
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.idproducto !== itemId);
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage();
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage();
  }
}