// export enum PaymentStatus {
//   PAID = 'PAID',
//   PENDING = 'PENDING',
//   FAILED = 'FAILED'
// }

// export enum ShippingStatus {
//   PROCESSING = 'PROCESSING',
//   SHIPPED = 'SHIPPED',
//   DELIVERED = 'DELIVERED'
// }

// export interface OrderSummary {
//   id?: number;
//   productId?: number;
//   name?: string;
//   quantity?: number;
//   total?: number;
//   paymentStatus?: PaymentStatus;
//   shippingStatus?: ShippingStatus;
// }
// Angular OrderSummary Model (order-summary.model.ts)
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

export interface OrderSummary {
  id?: number;
  productId?: number;
  name?: string;
  quantity?: number;
  total?: number;
   updateAt?: Date;
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
}