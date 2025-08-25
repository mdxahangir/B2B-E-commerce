import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 ngOnInit(): void {
    throw new Error('Method not implemented.');
}

  // products: Product[] = [];

  // constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.loadProducts();
  // }

  // loadProducts(): void {
  //   this.productService.getAll().subscribe({
  //     next: (products) => {
  //       this.products = products;
  //     },
  //     error: (err) => {
  //       console.error('Error loading products', err);
  //     }
  //   });
  // }
}