import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// adjust the path if needed
import { Observable } from 'rxjs';
import { Buyer } from 'src/app/core/Models/admins/byer.model';


@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private apiUrl = 'http://localhost:3000/users'; // adjust to match your JSON Server

  constructor(private http: HttpClient) {}

  createBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(this.apiUrl, buyer);
  }
}