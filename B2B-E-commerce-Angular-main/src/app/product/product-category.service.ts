import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductCategory } from "./product-category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiUrl = "http://localhost:8080/api/product/categories";

  constructor(private http: HttpClient) { }

  // Get all product categories
  getAll(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.apiUrl);
  }

  // Get single product category by id
  get(id: any): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${this.apiUrl}/${id}`);
  }

  // Create new product category
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Update existing product category
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Delete product category by id
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Delete all product categories (new method)
  deleteAll(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  // Find product categories by name (new method)
  findByName(categoryName: string): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.apiUrl}?name=${categoryName}`);
  }
}