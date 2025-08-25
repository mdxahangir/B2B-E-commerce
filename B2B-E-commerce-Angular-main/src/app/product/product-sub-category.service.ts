import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSubCategory } from './product-sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSubCategoryService {
  private apiUrl = 'http://localhost:8080/api/subcategories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductSubCategory[]> {
    return this.http.get<ProductSubCategory[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProductSubCategory> {
    return this.http.get<ProductSubCategory>(`${this.apiUrl}/${id}`);
  }

  create(subCategory: ProductSubCategory): Observable<ProductSubCategory> {
    return this.http.post<ProductSubCategory>(this.apiUrl, subCategory);
  }

  update(id: number, subCategory: ProductSubCategory): Observable<ProductSubCategory> {
    return this.http.put<ProductSubCategory>(`${this.apiUrl}/${id}`, subCategory);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}