import { Injectable } from '@angular/core';
import { Order, PaymentDetails } from './pay-to-supplier.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayToSupplierService {

 private currentOrder: Order = {
    orderId: 'ORD-1001',
    buyerName: 'John Doe',
    supplierName: 'ABC Supplier',
    productName: 'Product XYZ',
    quantity: 10,
    totalAmount: 199.99,
    deliveryStatus: 'Delivered',
    orderStatus: 'Completed'
  };

  constructor() { }

  getOrderDetails(): Observable<Order> {
    // In a real app, this would be an HTTP request
    return of(this.currentOrder).pipe(delay(500));
  }

  processPayment(paymentDetails: PaymentDetails): Observable<{success: boolean, message: string}> {
    // Simulate API call with delay
    return of({
      success: true,
      message: `Payment of $${this.currentOrder.totalAmount.toFixed(2)} to ${this.currentOrder.supplierName} successful!`
    }).pipe(delay(2000));
  }
}
