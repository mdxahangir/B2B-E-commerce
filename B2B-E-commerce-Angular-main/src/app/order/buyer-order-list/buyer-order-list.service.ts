import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuyerOrder } from './buyer-order-list.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerOrderListService {
  private baseUrl = 'http://localhost:8080/api/order-summaries';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<BuyerOrder[]> {
    return this.http.get<BuyerOrder[]>(this.baseUrl);
  }
}