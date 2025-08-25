import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../registration.model';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  countries = [
    { code: 'BD', name: 'Bangladesh' },
    { code: 'US', name: 'United States' },
    { code: 'CN', name: 'China' },
    { code: 'IN', name: 'India' },
    { code: 'JP', name: 'Japan' },
    { code: 'DE', name: 'Germany' }
  ];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      country: ['US'],
      role: ['buyer'],
      companyName: [''],
      firstName: [''],
      lastName: [''],
      phoneCode: ['+1'],
      phoneNumber: [''],
      agreedToTerms: [false]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const user: User = {
        email: formData.email,
        password: formData.password,
        country: formData.country,
        role: formData.role,
        companyName: formData.companyName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber,
        agreedToTerms: formData.agreedToTerms
      };

      this.registrationService.register(user).subscribe({
        next: (response) => {
          this.router.navigate(['/registration-success']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }

  checkEmail() {
    const email = this.registrationForm.get('email')?.value;
    if (email && this.registrationForm.get('email')?.valid) {
      this.registrationService.checkEmailExists(email).subscribe(exists => {
        if (exists) {
          this.registrationForm.get('email')?.setErrors({ emailExists: true });
        }
      });
    }
  }
}