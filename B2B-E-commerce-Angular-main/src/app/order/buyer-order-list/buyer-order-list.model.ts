export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export enum ShippingStatus {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export interface BuyerOrder {
  id?: number;
  productId?: number;
  name?: string;
  quantity?: number;
  total?: number;
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
}