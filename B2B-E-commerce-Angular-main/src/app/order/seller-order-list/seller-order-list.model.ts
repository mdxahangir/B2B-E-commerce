export enum ShippingStatus {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export interface SellerOrder {
  id?: number;
  productId?: number;
  name?: string;
  quantity?: number;
  total?: number;
  paymentStatus?: string;
  shippingStatus?: ShippingStatus;
}