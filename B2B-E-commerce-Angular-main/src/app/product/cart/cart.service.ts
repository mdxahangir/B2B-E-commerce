// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CartItem, CartResponse } from './cart.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private apiUrl = 'http://localhost:8080/api/cart';
//   private localCartKey = 'local_cart';

//   constructor(private http: HttpClient) { }

//   // Get cart summary from backend
//   getCartSummary(productIds: number[]): Observable<CartResponse> {
//     return this.http.post<CartResponse>(`${this.apiUrl}/summary`, productIds);
//   }

//   // Local cart management (for frontend before checkout)
//   getLocalCart(): CartItem[] {
//     const cartData = localStorage.getItem(this.localCartKey);
//     return cartData ? JSON.parse(cartData) : [];
//   }

//   saveLocalCart(items: CartItem[]): void {
//     localStorage.setItem(this.localCartKey, JSON.stringify(items));
//   }

//   addToCart(item: CartItem): void {
//     const cartItems = this.getLocalCart();
//     const existingItem = cartItems.find(i => i.productId === item.productId);

//     if (existingItem) {
//       existingItem.quantity += item.quantity;
//     } else {
//       cartItems.push(item);
//     }

//     this.saveLocalCart(cartItems);
//   }

//   updateQuantity(productId: number, quantity: number): void {
//     if (quantity < 1) return;
    
//     const cartItems = this.getLocalCart();
//     const item = cartItems.find(i => i.productId === productId);
    
//     if (item) {
//       item.quantity = quantity;
//       this.saveLocalCart(cartItems);
//     }
//   }

//   removeItem(productId: number): void {
//     let cartItems = this.getLocalCart();
//     cartItems = cartItems.filter(item => item.productId !== productId);
//     this.saveLocalCart(cartItems);
//   }

//   clearCart(): void {
//     localStorage.removeItem(this.localCartKey);
//   }

//   getCartItemCount(): number {
//     const cartItems = this.getLocalCart();
//     return cartItems.reduce((count, item) => count + item.quantity, 0);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem, CartResponse } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  private localCartKey = 'local_cart';

  constructor(private http: HttpClient) { }

  // Get cart summary from backend
  getCartSummary(productIds: number[]): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/summary`, productIds);
  }

  // Backend add to cart
  addToCart(userId: number, productId: number): Observable<any> {
    const url = `${this.apiUrl}/add`;
    const body = { userId, productId };
    return this.http.post<any>(url, body);
  }

  // Local cart management (for frontend before checkout)
  getLocalCart(): CartItem[] {
    const cartData = localStorage.getItem(this.localCartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  saveLocalCart(items: CartItem[]): void {
    localStorage.setItem(this.localCartKey, JSON.stringify(items));
  }

  addItemToLocalCart(item: CartItem): void {
    const cartItems = this.getLocalCart();
    const existingItem = cartItems.find(i => i.productId === item.productId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.push(item);
    }

    this.saveLocalCart(cartItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) return;
    
    const cartItems = this.getLocalCart();
    const item = cartItems.find(i => i.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      this.saveLocalCart(cartItems);
    }
  }

  removeItem(productId: number): void {
    let cartItems = this.getLocalCart();
    cartItems = cartItems.filter(item => item.productId !== productId);
    this.saveLocalCart(cartItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.localCartKey);
  }

  getCartItemCount(): number {
    const cartItems = this.getLocalCart();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}
