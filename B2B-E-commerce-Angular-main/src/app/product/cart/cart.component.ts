import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem, CartResponse } from './cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartSummary: CartResponse = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  };
  loading = false;
  error: string | null = null;

  shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 50, description: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', price: 100, description: '1-2 business days' }
  ];
  selectedShipping = 'standard';

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getLocalCart();
    this.calculateSummary();
    
    // In a real app, you might want to sync with backend here
    // this.syncWithBackend();
  }

  syncWithBackend(): void {
    this.loading = true;
    const productIds = this.cartItems.map(item => item.productId);
    
    this.cartService.getCartSummary(productIds).subscribe({
      next: (response) => {
        this.cartSummary = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cart details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  calculateSummary(): void {
    this.cartSummary.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const shippingMethod = this.shippingMethods.find(m => m.id === this.selectedShipping);
    this.cartSummary.shipping = shippingMethod ? shippingMethod.price : 0;
    
    this.cartSummary.tax = this.cartSummary.subtotal * 0.1;
    this.cartSummary.total = this.cartSummary.subtotal + this.cartSummary.shipping + this.cartSummary.tax;
  }

  updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateQuantity(item.productId, quantity);
    this.loadCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  onShippingChange(): void {
    this.calculateSummary();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}