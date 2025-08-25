import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout/checkout.service';
import { CartItem, CartResponse } from '../cart/cart.model';
import { Address } from '../checkout/address.model';
import { PaymentMethod } from '../checkout/payment-method.model';
import { ShippingMethod } from '../checkout/shipping-method.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string = '';
  cartItems: CartItem[] = [];
  cartResponse:CartResponse[] =[];
  shippingMethod: ShippingMethod | null = null;
  paymentMethod: PaymentMethod | null = null;
  address: Address | null = null;
  subtotal = 0;
  shippingCost = 0;
  tax = 0;
  total = 0;
  orderDate: Date = new Date();

  constructor(
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    // Generate a random order ID (in real app, this should come from backend)
    this.orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    // ✅ Get checkout data from service
    const checkoutData = this.checkoutService.getLastCheckoutData();

    if (checkoutData) {
      this.cartItems = checkoutData.cartItems;
      // this.cartResponse = checkoutData.cartResponse;
      this.shippingMethod = checkoutData.shippingMethod;
      this.paymentMethod = checkoutData.paymentMethod;
      this.address = checkoutData.address;

      // ✅ Calculate totals
      this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      this.shippingCost = this.shippingMethod?.price || 0;
      this.tax = this.subtotal * 0.1;
      this.total = this.subtotal + this.shippingCost + this.tax;
    } else {
      // Redirect if no checkout data found
      this.router.navigate(['/cart']);
    }
  }

  printInvoice(): void {
    window.print();
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
