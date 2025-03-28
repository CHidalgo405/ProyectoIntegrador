import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.idproducto, item.cantidad + 1);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.idproducto, item.cantidad - 1);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.preciomenudeo * item.cantidad, 0);
  }

  checkout() {
    this.router.navigate(['/checkout']); // Redirige a la página de checkout
  }
}