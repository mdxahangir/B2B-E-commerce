export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}