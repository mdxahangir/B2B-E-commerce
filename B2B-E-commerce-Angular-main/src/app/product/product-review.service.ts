import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductReview } from './product-review.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  private baseUrl = 'http://localhost:8080/api/product-reviews';

  constructor(private http: HttpClient) {}

  /**
   * Adds a review tied to the current user and product.
   */
  addReview(review: ProductReview, productId: number, userId: number): Observable<ProductReview> {
    return this.http.post<ProductReview>(
      `${this.baseUrl}?productId=${productId}&userId=${userId}`,
      review
    );
  }

  /**
   * Retrieves all reviews for a product.
   */
  getReviewsByProduct(productId: number): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(`${this.baseUrl}/product/${productId}`);
  }

  /**
   * Retrieves average rating for a product.
   */
  getAverageRating(productId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/product/${productId}/average-rating`);
  }
}
