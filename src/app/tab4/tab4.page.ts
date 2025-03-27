import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})

export class Tab4Page {

  getStatusColor(status: string): string {
    switch (status) {
      case 'entregado':
        return 'success';
      case 'en camino':
        return 'warning';
      case 'en tienda':
        return 'primary';
      default:
        return 'medium';
    }
  }
}