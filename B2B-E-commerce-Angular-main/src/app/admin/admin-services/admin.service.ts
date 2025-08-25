import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/core/Models/admins/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private apiUrl = 'http://localhost:3000/admins';

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  login(email: string, password: string): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

}
