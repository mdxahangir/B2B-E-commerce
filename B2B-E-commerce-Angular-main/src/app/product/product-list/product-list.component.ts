
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product } from '../product.model';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   displayedColumns: string[] = ['id', 'name', 'category', 'subCategory', 'price', 'quantity', 'actions'];

//   constructor(private service: ProductService) { }

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.service.getAll().subscribe(data => {
//       this.products = data;
//     });
//   }

//   deleteProduct(id: number): void {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.service.delete(id).subscribe(() => {
//         this.loadProducts();
//       });
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(
    private service: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service.getAll().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.service.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
  }
}