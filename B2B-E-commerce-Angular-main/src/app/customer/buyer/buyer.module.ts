import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
     HttpClientModule
  ]
})
export class BuyerModule { }
