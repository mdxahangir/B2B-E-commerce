import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerOrder, ShippingStatus } from './seller-order-list.model';

@Injectable({
  providedIn: 'root'
})
export class SellerOrderListService {
  private baseUrl = 'http://localhost:8080/api/order-summaries';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<SellerOrder[]> {
    return this.http.get<SellerOrder[]>(this.baseUrl);
  }

  updateShippingStatus(id: number, shippingStatus: ShippingStatus): Observable<SellerOrder> {
    return this.http.patch<SellerOrder>(`${this.baseUrl}/${id}`, { shippingStatus });
  }
}