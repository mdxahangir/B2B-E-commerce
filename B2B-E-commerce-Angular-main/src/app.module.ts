import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // toastr animation
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr'; // ✅ toastr import

// Routes import
import routes from './app/app-routing-module';

// Main Component
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { LayoutModule } from './app/layout/layout.module';

// Admin Components
import { DashboardComponent } from './app/admin/dashboard/dashboard.component';
import { UserCrudComponent } from './app/admin/user-crud/user-crud.component';
import { OrderManagementComponent } from './app/admin/order-management/order-management.component';
import { ProductsManagementComponent } from './app/admin/products-management/products-management.component';
import { BuyersManagementComponent } from './app/admin/buyers-management/buyers-management.component';
import { MarketingManagementComponent } from './app/admin/marketing-management/marketing-management.component';
import { AnalyticsManagementComponent } from './app/admin/analytics-management/analytics-management.component';
import { FinancialsManagementComponent } from './app/admin/financials-management/financials-management.component';
import { SettingsManagementComponent } from './app/admin/settings-management/settings-management.component';
import { PayToSupplierComponent } from './app/admin/pay-to-supplier/pay-to-supplier.component';
import { SellerListComponent } from './app/admin/seller-list/seller-list.component';
import { SalesReportComponent } from './app/admin/sales-report/sales-report.component';

// Buyer Components
import { BuyerDashboardComponent } from './app/customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { LoginComponent } from './app/login/login.component';

// Supplier Components
import { ProductListingsComponent } from './app/customer/supplier/product-listings/product-listings.component';
import { PaymentTrackingComponent } from './app/customer/supplier/payment-tracking/payment-tracking.component';
import { SellerPaymentComponent } from './app/customer/supplier/seller-payment/seller-payment.component';
import { OrderProcessingComponent } from './app/customer/supplier/order-processing/order-processing.component';
import { SupplierProductComponent } from './app/customer/supplier/supplier-product/supplier-product.component';
import { SellerDashboardComponent } from './app/customer/supplier/seller-dashboard/seller-dashboard.component';

// Product Management Components
import { ProductListComponent } from './app/product/product-list/product-list.component';
import { ProductFormComponent } from './app/product/product-form/product-form.component';
import { ProductCategoryListComponent } from './app/product/product-category-list/product-category-list.component';
import { ProductCategoryFormComponent } from './app/product/product-category-form/product-category-form.component';
import { ProductSubCategoryListComponent } from './app/product/product-sub-category-list/product-sub-category-list.component';
import { ProductSubCategoryFormComponent } from './app/product/product-sub-category-form/product-sub-category-form.component';
import { ProductCardComponent } from './app/product/product-card/product-card.component';
import { ProductDetailComponent } from './app/product/product-detail/product-detail.component';
import { RegistrationComponent } from './app/product/registration/registration.component';
import { CartComponent } from './app/product/cart/cart.component';
import { CheckoutComponent } from './app/product/checkout/checkout.component';
import { OrderConfirmationComponent } from './app/product/order-confirmation/order-confirmation.component';
import { WishlistComponent } from './app/product/wishlist/wishlist.component';

// Trade Components
import { GoldSuppliersComponent } from './app/customer/gold-suppliers/gold-suppliers.component';
import { TradeAssuranceComponent } from './app/customer/trade/trade-assurance/trade-assurance.component';
import { TradeShowsComponent } from './app/customer/trade/trade-shows/trade-shows.component';
import { ExhibitionRegistrationComponent } from './app/customer/trade/exhibition-registration/exhibition-registration.component';
import { AssurenceFormComponent } from './app/customer/trade/assurence-form/assurence-form.component';

// Messages
import { MessageContainerComponent } from './app/customer/messages/message-container/message-container.component';

// Shipping
import { ShippingRadyComponent } from './app/customer/shipping/shipping-rady/shipping-rady.component';

// Orders
import { AddressComponent } from './app/order/address/address.component';
import { ShippingMethodComponent } from './app/order/shipping-method/shipping-method.component';
import { PaymentMethodComponent } from './app/order/payment-method/payment-method.component';
import { OrderSummaryComponent } from './app/order/order-summary/order-summary.component';
import { OrderListComponent } from './app/order/order-list/order-list.component';
import { SellerOrderListComponent } from './app/order/seller-order-list/seller-order-list.component';
import { BuyerOrderListComponent } from './app/order/buyer-order-list/buyer-order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // Admin
    DashboardComponent,
    UserCrudComponent,
    OrderManagementComponent,
    ProductsManagementComponent,
    BuyersManagementComponent,
    MarketingManagementComponent,
    AnalyticsManagementComponent,
    FinancialsManagementComponent,
    SettingsManagementComponent,
    PayToSupplierComponent,
    SellerListComponent,
    SalesReportComponent,
    // Buyer
    BuyerDashboardComponent,
    LoginComponent,
    // Supplier
    ProductListingsComponent,
    PaymentTrackingComponent,
    SellerPaymentComponent,
    OrderProcessingComponent,
    SupplierProductComponent,
    SellerDashboardComponent,
    // Product Management
    ProductListComponent,
    ProductFormComponent,
    ProductCategoryListComponent,
    ProductCategoryFormComponent,
    ProductSubCategoryListComponent,
    ProductSubCategoryFormComponent,
    ProductCardComponent,
    ProductDetailComponent,
    RegistrationComponent,
    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    WishlistComponent,
    // Trade
    GoldSuppliersComponent,
    TradeAssuranceComponent,
    TradeShowsComponent,
    ExhibitionRegistrationComponent,
    AssurenceFormComponent,
    // Messages
    MessageContainerComponent,
    // Shipping
    ShippingRadyComponent,
    // Orders
    AddressComponent,
    ShippingMethodComponent,
    PaymentMethodComponent,
    OrderSummaryComponent,
    OrderListComponent,
    SellerOrderListComponent,
    BuyerOrderListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // ✅ Required for toastr
    LayoutModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ✅ ToastrModule configuration
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
