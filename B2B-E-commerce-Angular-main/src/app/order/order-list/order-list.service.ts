import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSummary } from '../order-summary/order-summary.model';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {
  private apiUrl = 'http://localhost:8080/api/order-summaries';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(this.apiUrl);
  }

  updateOrder(order: OrderSummary): Observable<OrderSummary> {
    return this.http.put<OrderSummary>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}