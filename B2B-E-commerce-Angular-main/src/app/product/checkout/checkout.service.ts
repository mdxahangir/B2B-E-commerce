// src/app/checkout/checkout.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout } from './checkout.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:8080/api/checkout';
  private lastCheckoutData!: Checkout;

  constructor(private http: HttpClient) {}

  processCheckout(data: Checkout): Observable<any> {
    this.lastCheckoutData = data;
    return this.http.post(this.apiUrl, data);
  }

  getLastCheckoutData(): Checkout {
    return this.lastCheckoutData;
  }

  getPaymentMethods() {
    return [
      { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive the product' },
      { id: 'card', name: 'Credit/Debit Card', description: 'Secure online payment' },
      { id: 'bkash', name: 'bKash', description: 'Mobile payment' }
    ];
  }

  getShippingMethods() {
    return [
      { id: 'standard', name: 'Standard Shipping', price: 50, description: '3-5 business days' },
      { id: 'express', name: 'Express Shipping', price: 100, description: '1-2 business days' }
    ];
  }
}
