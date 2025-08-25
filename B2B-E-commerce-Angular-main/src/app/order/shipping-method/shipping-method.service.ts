import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShippingMethod } from 'src/app/product/checkout/shipping-method.model';


@Injectable({
  providedIn: 'root'
})
export class ShippingMethodService {
  private apiUrl = 'http://localhost:8080/api/shipping-methods';

  constructor(private http: HttpClient) { }

  getAllShippingMethods(): Observable<ShippingMethod[]> {
    return this.http.get<ShippingMethod[]>(this.apiUrl);
  }

  getShippingMethodById(id: string): Observable<ShippingMethod> {
    return this.http.get<ShippingMethod>(`${this.apiUrl}/${id}`);
  }

  createShippingMethod(method: ShippingMethod): Observable<ShippingMethod> {
    return this.http.post<ShippingMethod>(this.apiUrl, method);
  }

  updateShippingMethod(id: string, method: ShippingMethod): Observable<ShippingMethod> {
    return this.http.put<ShippingMethod>(`${this.apiUrl}/${id}`, method);
  }

  deleteShippingMethod(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}