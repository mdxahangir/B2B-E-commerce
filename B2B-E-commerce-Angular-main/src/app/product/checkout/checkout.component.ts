// src/app/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';
import { Checkout } from './checkout.model';
import { Address } from './address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  paymentMethods: any[] = [];
  shippingMethods: any[] = [];
  selectedPayment = 'cod';
  selectedShipping = 'standard';
  subtotal = 0;
  shipping = 0;
  tax = 0;
  total = 0;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      stateProvince: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]]
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getLocalCart();
    this.paymentMethods = this.checkoutService.getPaymentMethods();
    this.shippingMethods = this.checkoutService.getShippingMethods();
    this.calculateSummary();
  }

  calculateSummary(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.shipping = this.shippingMethods.find(m => m.id === this.selectedShipping)?.price || 0;
    this.tax = this.subtotal * 0.1;
    this.total = this.subtotal + this.shipping + this.tax;
  }

  onShippingChange(): void {
    this.calculateSummary();
  }

  onSubmit(): void {
    // if (this.checkoutForm.invalid) {
    //   this.checkoutForm.markAllAsTouched();
    //   return;
    // }

   console.log(this.checkoutForm.value)

    const checkoutData: Checkout = {
  
      cartItems: this.cartItems,
      address: this.checkoutForm.value,
      paymentMethod: this.paymentMethods.find(p => p.id === this.selectedPayment)!,
      shippingMethod: this.shippingMethods.find(s => s.id === this.selectedShipping)!,
      sessionToken: ''
    };

    this.loading = true;

    
    this.checkoutService.processCheckout(checkoutData).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/order-confirmation']);
      },
      error: () => {
        this.error = 'Checkout failed';
        this.loading = false;
      }
    });
  }
}
