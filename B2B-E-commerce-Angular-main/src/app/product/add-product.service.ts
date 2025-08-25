import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, Product } from "./add-product.maodel";
import { Observable } from "rxjs";





@Injectable({
  providedIn: 'root'
})
export class AddProductService {
 private apiUrl = "";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  saveAsDraft(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/drafts`, productData);
  }
}
