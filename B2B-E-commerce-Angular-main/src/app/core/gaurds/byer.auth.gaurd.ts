import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/customer/services/customer.service';


@Injectable({ providedIn: 'root' })
export class BuyerAuthGaurdService implements CanActivate {
  constructor() {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        throw new Error('Method not implemented.');
    }

  
 
 
}