import { Component, OnInit } from '@angular/core';
import { BuyerOrderListService } from './buyer-order-list.service';
import { BuyerOrder } from './buyer-order-list.model';


@Component({
  selector: 'app-buyer-order-list',
  templateUrl: './buyer-order-list.component.html',
  styleUrls: ['./buyer-order-list.component.css']
})
export class BuyerOrderListComponent implements OnInit {
  orders: BuyerOrder[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private orderService: BuyerOrderListService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
        console.error('Error loading orders:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PAID':
      case 'DELIVERED':
        return 'status-completed';
      case 'PENDING':
      case 'PROCESSING':
        return 'status-pending';
      case 'FAILED':
        return 'status-failed';
      default:
        return '';
    }
  }
}