import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from './user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.login(loginRequest).subscribe({
        next: (user) => {
          this.loginService.setCurrentUser(user);
          this.redirectBasedOnRole(user.role);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password';
        }
      });
    }
  }

  private redirectBasedOnRole(role: string | undefined) {
    if (role === 'buyer') {
      this.router.navigate(['/home']);
    } else if (role === 'seller') {
      this.router.navigate(['/seller-dashboard']);
    } else if (role === 'both') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}