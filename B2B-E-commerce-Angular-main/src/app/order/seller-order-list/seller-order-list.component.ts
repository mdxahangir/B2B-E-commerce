import { Component, OnInit } from '@angular/core';
import { SellerOrder, ShippingStatus } from './seller-order-list.model';
import { SellerOrderListService } from './seller-order-list.service';


@Component({
  selector: 'app-seller-order-list',
  templateUrl: './seller-order-list.component.html',
  styleUrls: ['./seller-order-list.component.css']
})
export class SellerOrderListComponent implements OnInit {
  orders: SellerOrder[] = [];
  shippingStatuses = Object.values(ShippingStatus);
  isLoading = false;

  constructor(private orderService: SellerOrderListService) { }

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
        console.error('Error loading orders:', err);
        this.isLoading = false;
      }
    });
  }

  updateShippingStatus(order: SellerOrder, newStatus: ShippingStatus): void {
    if (order.shippingStatus !== newStatus && order.id) {
      const originalStatus = order.shippingStatus;
      order.shippingStatus = newStatus;
      
      this.orderService.updateShippingStatus(order.id, newStatus).subscribe({
        error: (err) => {
          console.error('Error updating shipping status:', err);
          order.shippingStatus = originalStatus; // Revert on error
        }
      });
    }
  }
}