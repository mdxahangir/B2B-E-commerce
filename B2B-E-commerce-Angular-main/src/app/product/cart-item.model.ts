// export interface PaymentMethod {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
// }

// export interface OrderSummary {
//   subtotal: number;
//   shipping: number;
//   tax: number;
//   total: number;
// }

// export interface Address {
//   id?: number;
//   fullName: string;
//   streetAddress: string;
//   city: string;
//   stateProvince: string;
//   postalCode: string;
//   country: string;
//   phoneNumber: string;
//   defaultShipping: boolean;
// }
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  productImage?: string;
}

