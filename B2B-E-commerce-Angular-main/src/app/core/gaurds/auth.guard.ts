import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin-services/admin.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}