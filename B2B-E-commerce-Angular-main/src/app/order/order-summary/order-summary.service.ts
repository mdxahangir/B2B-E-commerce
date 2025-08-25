import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSummary } from './order-summary.model';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  private baseUrl = 'http://localhost:8080/api/order-summaries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(this.baseUrl);
  }

  get(id: number): Observable<OrderSummary> {
    return this.http.get<OrderSummary>(`${this.baseUrl}/${id}`);
  }

  create(orderSummary: OrderSummary): Observable<OrderSummary> {
    return this.http.post<OrderSummary>(this.baseUrl, orderSummary);
  }

  update(id: number, orderSummary: OrderSummary): Observable<OrderSummary> {
    return this.http.put<OrderSummary>(`${this.baseUrl}/${id}`, orderSummary);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
    getSalesReport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sales-report`);
  }
}
