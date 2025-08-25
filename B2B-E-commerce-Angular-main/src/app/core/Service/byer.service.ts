import { Injectable } from '@angular/core';
import { Buyer } from '../Models/admins/byer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ByerService {

  private apiUrl = 'http://localhost:3000/buyers';

  constructor(private http: HttpClient) {}

  createBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(this.apiUrl, buyer);
  }

  getBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.apiUrl);
  }
}
