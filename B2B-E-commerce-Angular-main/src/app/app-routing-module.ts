
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { ProductsManagementComponent } from './admin/products-management/products-management.component';
import { ProductListingsComponent } from './customer/supplier/product-listings/product-listings.component';
import { PaymentTrackingComponent } from './customer/supplier/payment-tracking/payment-tracking.component';
import { OrderProcessingComponent } from './customer/supplier/order-processing/order-processing.component';
import { SellerPaymentComponent } from './customer/supplier/seller-payment/seller-payment.component';
import { CartComponent } from './product/cart/cart.component';
import { OrderProtectionComponent } from './customer/order-protection/order-protection.component';
import { GoldSuppliersComponent } from './customer/gold-suppliers/gold-suppliers.component';
import { TradeAssuranceComponent } from './customer/trade/trade-assurance/trade-assurance.component';
import { MessageContainerComponent } from './customer/messages/message-container/message-container.component';
import { AssurenceFormComponent } from './customer/trade/assurence-form/assurence-form.component';
import { ExhibitionRegistrationComponent } from './customer/trade/exhibition-registration/exhibition-registration.component';
import { ShippingRadyComponent } from './customer/shipping/shipping-rady/shipping-rady.component';
import { TradeShowsComponent } from './customer/trade/trade-shows/trade-shows.component';
import { PayToSupplierComponent } from './admin/pay-to-supplier/pay-to-supplier.component';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductCategoryListComponent } from './product/product-category-list/product-category-list.component';
import { ProductCategoryFormComponent } from './product/product-category-form/product-category-form.component';
import { ProductSubCategoryListComponent } from './product/product-sub-category-list/product-sub-category-list.component';
import { ProductSubCategoryFormComponent } from './product/product-sub-category-form/product-sub-category-form.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

import { RegistrationComponent } from './product/registration/registration.component';
import { AuthGuard } from './login/auth.gurd';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from '../app/customer/supplier/seller-dashboard/seller-dashboard.component';
import { CheckoutComponent } from './product/checkout/checkout.component';

import { OrderConfirmationComponent } from './product/order-confirmation/order-confirmation.component';
import { AddressComponent } from './order/address/address.component';
import { ShippingMethodComponent } from './order/shipping-method/shipping-method.component';
import { PaymentMethodComponent } from './order/payment-method/payment-method.component';
import { OrderSummaryComponent } from './order/order-summary/order-summary.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { SellerOrderListComponent } from './order/seller-order-list/seller-order-list.component';
import { BuyerOrderListComponent } from './order/buyer-order-list/buyer-order-list.component';
import { SellerListComponent } from './admin/seller-list/seller-list.component';
import { SalesReportComponent } from './admin/sales-report/sales-report.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';




const routes: Routes = [

  { path: "", component: HomeComponent },
  // { path: "admin-dashboard", component: DashboardComponent },
  { path: 'admin/sellers', component: SellerListComponent },
  { path: 'seles-report', component: SalesReportComponent },

  { path: "buyer-dashboard", component: BuyerDashboardComponent },
  { path: "pay-to-supplier", component: PayToSupplierComponent },


  //Users------
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuard] },
  { 
    path: 'seller-dashboard',
     component: SellerDashboardComponent,
      canActivate: [AuthGuard],
      children: [
             // product add crud
    { path: 'products-management', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent },
    { path: 'products/:id/edit', component: ProductFormComponent },

          //product category
    { path: "category-list", component: ProductCategoryListComponent},
    { path: 'product-categories', component: ProductCategoryListComponent },
    { path: 'product-categories/add', component: ProductCategoryFormComponent },
    { path: 'product-categories/:id', component: ProductCategoryFormComponent },
      //product sub category
    { path: 'subcategories', component: ProductSubCategoryListComponent },
    { path: 'subcategories/new', component: ProductSubCategoryFormComponent },
    { path: 'subcategories/:id/edit', component: ProductSubCategoryFormComponent },
      { path: 'seller-order-list', component: SellerOrderListComponent },
      ],    
    },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
     // product add crud
    { path: 'products-management', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent },
    { path: 'products/:id/edit', component: ProductFormComponent },

          //product category
    { path: "category-list", component: ProductCategoryListComponent},
    { path: 'product-categories', component: ProductCategoryListComponent },
    { path: 'product-categories/add', component: ProductCategoryFormComponent },
    { path: 'product-categories/:id', component: ProductCategoryFormComponent },
      //product sub category
    { path: 'subcategories', component: ProductSubCategoryListComponent },
    { path: 'subcategories/new', component: ProductSubCategoryFormComponent },
    { path: 'subcategories/:id/edit', component: ProductSubCategoryFormComponent },

    { path: "seller-list", component: SellerListComponent},

    { path: 'order-list', component: OrderListComponent },

    { path: 'seles-report', component: SalesReportComponent },

  ],
},

  
   // Home page
  { path: "gold-supplier", component: GoldSuppliersComponent },
  { path: "trade-assurance", component: TradeAssuranceComponent },
  { path: "trade-shows", component: TradeShowsComponent },
  { path: "exhibition-registration", component: ExhibitionRegistrationComponent },
  { path: "assurence-form", component: AssurenceFormComponent },

  //Messages
  { path: 'messages', component: MessageContainerComponent },
  //Favourite
  { path: 'wishlist', component: WishlistComponent },
  //shipping
  { path: "shipping-rady", component: ShippingRadyComponent },
  //supplier
  { path: 'seller-dashboard',component: SellerDashboardComponent},
  // product add crud
  { path: 'products-management', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  //product category
  { path: "category-list", component: ProductCategoryListComponent},
  { path: 'product-categories', component: ProductCategoryListComponent },
  { path: 'product-categories/add', component: ProductCategoryFormComponent },
  { path: 'product-categories/:id', component: ProductCategoryFormComponent },
  //product sub category
  { path: 'subcategories', component: ProductSubCategoryListComponent },
  { path: 'subcategories/new', component: ProductSubCategoryFormComponent },
  { path: 'subcategories/:id/edit', component: ProductSubCategoryFormComponent },
  //product card
  {path: "home", component: ProductCardComponent},
  //product detail
  {path: "product-detail/:id", component: ProductDetailComponent },
  //product cart
  { path: 'home/:id', component: CartComponent },

  // { path: 'message/:supplierId', component: MessageComponent },
  //Checkout for order
  { path: 'checkout', component: CheckoutComponent },
  // confirmation of order
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  //order list for buyer/admin/supplier
  {
    path: 'order-confirmation/:id',
    component: OrderConfirmationComponent,
    data: { title: 'Order Confirmation' }
  },



  { path: "order-management", component: OrderManagementComponent },
  { path: 'product-management', component: ProductsManagementComponent },
  { path: 'product-listings', component: ProductListingsComponent },
  { path: 'payment-tracking', component: PaymentTrackingComponent },
  { path: 'order-processing', component: OrderProcessingComponent },
  { path: 'seller-payment', component: SellerPaymentComponent },
  { path: 'cart', component: CartComponent },
  { path: "order-protection", component: OrderProtectionComponent },
  // others
  { path: 'products', component: CartComponent },
  { path: 'help', component: CartComponent },
  { path: 'contact', component: CartComponent },
  { path: 'dispute', component: CartComponent },
  { path: 'about', component: CartComponent },
  { path: 'terms', component: CartComponent },
  { path: 'privacy', component: CartComponent },
  //check 
   { path: 'address', component: AddressComponent },
  { path: 'shipping-method', component: ShippingMethodComponent },
  { path: 'payment-method', component: PaymentMethodComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'order-list', component: OrderListComponent },
    { path: 'seller-order-list', component: SellerOrderListComponent },
  { path: 'buyer-t', component: BuyerOrderListComponent},


];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export default routes;
