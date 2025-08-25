import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Users } from 'src/app/core/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Users | null>;
  public currentUser: Observable<Users | null>;
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Users | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Users | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  signup(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user).pipe(
      tap(newUser => {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        this.redirectBasedOnRole(newUser.role);
      })
    );
  }

  login(email: string, password: string): Observable<Users | null> {
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.redirectBasedOnRole(user.role);
          return user;
        }
        return null;
      }),
      catchError(() => of(null))
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private redirectBasedOnRole(role: string) {
    if (role === 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
    } else if (role === 'seller') {
      this.router.navigate(['/supplier-dashboard']);
    } else if (role === 'both') {
      this.router.navigate(['/home']);
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0)
    );
  }

}
