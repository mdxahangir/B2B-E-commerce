import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSummary } from 'src/app/order/order-summary/order-summary.model';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {
  private baseUrl = 'http://localhost:8080/api/order-summaries';

  constructor(private http: HttpClient) {}

  getSalesReport(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(`${this.baseUrl}`);
  }
}
