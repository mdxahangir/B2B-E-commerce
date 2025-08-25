import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/core/Models/user.model';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/users'; // JSON Server endpoint

  constructor(private http: HttpClient) { }

  registerUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  checkEmailExists(email: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}`);
  }
}
// src/app/services/registration.service.ts