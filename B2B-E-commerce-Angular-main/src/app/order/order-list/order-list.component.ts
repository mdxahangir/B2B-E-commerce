import { Component, OnInit } from '@angular/core';
import { OrderListService } from './order-list.service';
import { OrderSummary, PaymentStatus, ShippingStatus } from '../order-summary/order-summary.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: OrderSummary[] = [];
  paymentStatuses = Object.values(PaymentStatus);
  shippingStatuses = Object.values(ShippingStatus);
  isLoading = false;

  constructor(private orderService: OrderListService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.isLoading = false;
      }
    });
  }

  onPaymentStatusChange(order: OrderSummary): void {
    if (order.id) {
      this.orderService.updateOrder(order).subscribe({
        error: (err) => {
          console.error('Error updating payment status:', err);
        }
      });
    }
  }

  onShippingStatusChange(order: OrderSummary): void {
    if (order.id) {
      this.orderService.updateOrder(order).subscribe({
        error: (err) => {
          console.error('Error updating shipping status:', err);
        }
      });
    }
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.orders = this.orders.filter(order => order.id !== id);
        },
        error: (err) => {
          console.error('Error deleting order:', err);
        }
      });
    }
  }
}