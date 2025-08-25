import { Component, OnInit } from "@angular/core";
import { PayToSupplierService } from "./pay-to-supplier.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Order, PaymentDetails } from "./pay-to-supplier.model";

@Component({
  selector: 'app-pay-to-supplier',
  templateUrl: './pay-to-supplier.component.html',
  styleUrls: ['./pay-to-supplier.component.css']
})
export class PayToSupplierComponent implements OnInit {
  order: Order | null = null;  // Initialize as null
  paymentForm: FormGroup;      // Remove ! and initialize in constructor
  isLoading = false;
  paymentMessage: string | null = null;  // Initialize as null
  paymentCompleted = false;

  constructor(
    private payToSupplierService: PayToSupplierService,
    private fb: FormBuilder
  ) { 
    // Initialize form in constructor
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      transactionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    this.isLoading = true;
    this.payToSupplierService.getOrderDetails().subscribe({
      next: (order: Order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading order details:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation messages
    this.paymentForm.markAllAsTouched();
    
    if (this.paymentForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.paymentMessage = 'Processing payment...';

    const paymentDetails: PaymentDetails = {
      paymentMethod: this.paymentForm.get('paymentMethod')?.value || '',  // Safe access
      transactionId: this.paymentForm.get('transactionId')?.value || ''  // Safe access
    };

    this.payToSupplierService.processPayment(paymentDetails).subscribe({
      next: (response) => {
        this.paymentMessage = response.message;
        this.paymentCompleted = true;
        this.paymentForm.disable();
        this.isLoading = false;
      },
      error: (error) => {
        this.paymentMessage = 'Payment failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}