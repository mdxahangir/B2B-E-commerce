import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/product/checkout/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  addressForm: FormGroup;
  isEditing = false;
  currentAddressId: number | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      stateProvince: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      defaultShipping: [false]
    });
  }

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.isLoading = true;
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load addresses';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      return;
    }

    const addressData = this.addressForm.value;
    this.isLoading = true;

    if (this.isEditing && this.currentAddressId) {
      this.addressService.updateAddress(this.currentAddressId, addressData).subscribe({
        next: () => {
          this.loadAddresses();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to update address';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.addressService.createAddress(addressData).subscribe({
        next: () => {
          this.loadAddresses();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to create address';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  editAddress(address: Address): void {
    this.isEditing = true;
    this.currentAddressId = address.id || null;
    this.addressForm.patchValue({
      fullName: address.fullName,
      streetAddress: address.streetAddress,
      city: address.city,
      stateProvince: address.stateProvince,
      postalCode: address.postalCode,
      country: address.country,
      phoneNumber: address.phoneNumber,
      defaultShipping: address.defaultShipping
    });
  }

  deleteAddress(id: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.isLoading = true;
      this.addressService.deleteAddress(id).subscribe({
        next: () => {
          this.loadAddresses();
        },
        error: (err) => {
          this.error = 'Failed to delete address';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  setDefaultAddress(id: number): void {
    this.isLoading = true;
    this.addressService.setDefaultAddress(id).subscribe({
      next: () => {
        this.loadAddresses();
      },
      error: (err) => {
        this.error = 'Failed to set default address';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  resetForm(): void {
    this.addressForm.reset({
      defaultShipping: false
    });
    this.isEditing = false;
    this.currentAddressId = null;
    this.isLoading = false;
  }
}