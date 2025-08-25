import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadProductWithImage(product: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    createdByCode: string;
    createdByName: string;
    productCategoryId: number;
    productSubCategoryId: number;
  }, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('createdByCode', product.createdByCode);
    formData.append('createdByName', product.createdByName);
    formData.append('productCategoryId', product.productCategoryId.toString());
    formData.append('productSubCategoryId', product.productSubCategoryId.toString());
    formData.append('image', imageFile);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
