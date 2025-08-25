export interface Order {
  orderId: string;
  buyerName: string;
  supplierName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  deliveryStatus: string;
  orderStatus: string;
}

export interface PaymentDetails {
  paymentMethod: string;
  transactionId: string;
}