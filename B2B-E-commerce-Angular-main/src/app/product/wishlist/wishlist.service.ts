import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private apiUrl = 'http://localhost:8080/api/wishlist';

  constructor(private http: HttpClient) {}

  /**
   * Add a product to the user's wishlist
   * Uses POST with JSON body { userId, productId }
   */
  addToWishList(userId: number, productId: number): Observable<any> {
    const url = `${this.apiUrl}/add`;
    const body = { userId, productId };
    return this.http.post<any>(url, body);
  }

  /**
   * Get all wishlist items for a specific user
   * Uses GET with userId in the URL
   */
  getUserWishList(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any[]>(url);
  }

  /**
   * Remove an item from the user's wishlist by wishlistId
   * Uses DELETE
   */
  removeFromWishList(wishListId: number): Observable<void> {
    const url = `${this.apiUrl}/${wishListId}`;
    return this.http.delete<void>(url);
  }
}
