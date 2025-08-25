import { Component, OnInit } from '@angular/core';
import { ShippingMethodService } from './shipping-method.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingMethod } from 'src/app/product/checkout/shipping-method.model';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.css']
})
export class ShippingMethodComponent implements OnInit {
  shippingMethods: ShippingMethod[] = [];
  methodForm: FormGroup;
  isEditing = false;
  currentMethodId: string | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private shippingMethodService: ShippingMethodService,
    private fb: FormBuilder
  ) {
    this.methodForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadShippingMethods();
  }

  loadShippingMethods(): void {
    this.isLoading = true;
    this.shippingMethodService.getAllShippingMethods().subscribe({
      next: (methods) => {
        this.shippingMethods = methods;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load shipping methods';
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
      this.shippingMethodService.updateShippingMethod(this.currentMethodId, methodData).subscribe({
        next: () => {
          this.loadShippingMethods();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to update shipping method';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.shippingMethodService.createShippingMethod(methodData).subscribe({
        next: () => {
          this.loadShippingMethods();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to create shipping method';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  editMethod(method: ShippingMethod): void {
    this.isEditing = true;
    this.currentMethodId = method.id;
    this.methodForm.patchValue({
      id: method.id,
      name: method.name,
      price: method.price,
      description: method.description
    });
  }

  deleteMethod(id: string): void {
    if (confirm('Are you sure you want to delete this shipping method?')) {
      this.isLoading = true;
      this.shippingMethodService.deleteShippingMethod(id).subscribe({
        next: () => {
          this.loadShippingMethods();
        },
        error: (err) => {
          this.error = 'Failed to delete shipping method';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  resetForm(): void {
    this.methodForm.reset({
      price: 0
    });
    this.isEditing = false;
    this.currentMethodId = null;
    this.isLoading = false;
  }
}