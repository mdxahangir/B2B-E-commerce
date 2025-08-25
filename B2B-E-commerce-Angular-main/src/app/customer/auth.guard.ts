import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    const requiredRoles = next.data['roles'] as Array<string>;

    if (currentUser) {
      if (requiredRoles && !requiredRoles.includes(currentUser.role)) {
        // Role not authorized, redirect to login
        this.router.navigate(['/login']);
        return false;
      }
      // Authorized
      return true;
    }

    // Not logged in, redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}