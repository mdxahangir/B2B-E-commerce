import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from './payment-method.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentMethod } from 'src/app/product/checkout/payment-method.model';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  paymentMethods: PaymentMethod[] = [];
  methodForm: FormGroup;
  isEditing = false;
  currentMethodId: string | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private paymentMethodService: PaymentMethodService,
    private fb: FormBuilder
  ) {
    this.methodForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods(): void {
    this.isLoading = true;
    this.paymentMethodService.getAllPaymentMethods().subscribe({
      next: (methods) => {
        this.paymentMethods = methods;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load payment methods';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.methodForm.invalid) {
      return;
    }

    const methodData = this.methodForm.value;
    this.isLoading = true;

    if (this.isEditing && this.currentMethodId) {
      this.paymentMethodService.updatePaymentMethod(this.currentMethodId, methodData).subscribe({
        next: () => {
          this.loadPaymentMethods();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to update payment method';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.paymentMethodService.createPaymentMethod(methodData).subscribe({
        next: () => {
          this.loadPaymentMethods();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to create payment method';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  editMethod(method: PaymentMethod): void {
    this.isEditing = true;
    this.currentMethodId = method.id;
    this.methodForm.patchValue({
      id: method.id,
      name: method.name,
      description: method.description
    });
  }

  deleteMethod(id: string): void {
    if (confirm('Are you sure you want to delete this payment method?')) {
      this.isLoading = true;
      this.paymentMethodService.deletePaymentMethod(id).subscribe({
        next: () => {
          this.loadPaymentMethods();
        },
        error: (err) => {
          this.error = 'Failed to delete payment method';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  resetForm(): void {
    this.methodForm.reset();
    this.isEditing = false;
    this.currentMethodId = null;
    this.isLoading = false;
  }
}