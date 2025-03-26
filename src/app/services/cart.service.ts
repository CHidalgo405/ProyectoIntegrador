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

  constructor() {}

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.idproducto === product.idproducto);
    if (existingItem) {
      existingItem.cantidad += 1; // Incrementa la cantidad si ya existe
    } else {
      // Agrega un nuevo ítem si no existe
      this.cartItems.push({
        idproducto: product.idproducto,
        nombre: product.nombre,
        image_url: product.image_url || 'https://via.placeholder.com/150',
        preciomenudeo: product.preciomenudeo,
        cantidad: 1
      });
    }
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(itemIdproducto: number, cantidad: number) {
    const item = this.cartItems.find(i => i.idproducto === itemIdproducto);
    if (item) {
      if (cantidad <= 0) {
        this.removeItem(itemIdproducto);
      } else {
        item.cantidad = cantidad;
        this.cartSubject.next([...this.cartItems]);
      }
    }
  }

  removeItem(itemIdproducto: number) {
    this.cartItems = this.cartItems.filter(item => item.idproducto !== itemIdproducto);
    this.cartSubject.next([...this.cartItems]);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
  }
}