import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: false,
})
export class ReceiptPage {
  customer: { name: string; email: string } = { name: '', email: '' };
  cart: { name: string; price: number }[] = [];
  total: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        const state = navigation.extras.state as { customer: { name: string; email: string }; cart: { name: string; price: number }[] };
        this.customer = state.customer || { name: '', email: '' };
        this.cart = state.cart || [];
        this.total = this.cart.reduce((sum, item) => sum + item.price, 0);
      }
    });
  }
}
