// src/app/checkout/checkout.model.ts

import { CartItem, CartResponse } from '../cart/cart.model';
import { Address } from './address.model';
import { PaymentMethod } from './payment-method.model';
import { ShippingMethod } from './shipping-method.model';

export interface Checkout {
  cartItems: CartItem[];           // OrderSummary হিসেবে যাবে
  // cartResponse: CartResponse[],
  address: Address;                 // ডেলিভারি ঠিকানা
  paymentMethod: PaymentMethod;    // Payment ID
  shippingMethod: ShippingMethod;  // Shipping ID
  sessionToken: string;            // Optional
}
