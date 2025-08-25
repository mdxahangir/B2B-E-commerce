import { Component, OnInit } from '@angular/core';
import { OrderSummary, PaymentStatus, ShippingStatus } from './order-summary.model';
import { OrderSummaryService } from './order-summary.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderSummaries: OrderSummary[] = [];
  selectedOrder: OrderSummary = {};
  isEditMode = false;

  paymentStatuses = Object.values(PaymentStatus);
  shippingStatuses = Object.values(ShippingStatus);

  constructor(private orderSummaryService: OrderSummaryService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.orderSummaryService.getAll().subscribe(data => this.orderSummaries = data);
  }

  selectOrder(order: OrderSummary) {
    this.selectedOrder = {...order};
    this.isEditMode = true;
  }

  createOrder() {
    this.orderSummaryService.create(this.selectedOrder).subscribe(() => {
      this.loadAll();
      this.resetForm();
    });
  }

  updateOrder() {
    if (this.selectedOrder.id) {
      this.orderSummaryService.update(this.selectedOrder.id, this.selectedOrder).subscribe(() => {
        this.loadAll();
        this.resetForm();
      });
    }
  }

  deleteOrder(id?: number) {
    if (id) {
      this.orderSummaryService.delete(id).subscribe(() => {
        this.loadAll();
        if (this.selectedOrder.id === id) {
          this.resetForm();
        }
      });
    }
  }

  resetForm() {
    this.selectedOrder = {};
    this.isEditMode = false;
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateOrder();
    } else {
      this.createOrder();
    }
  }
}
