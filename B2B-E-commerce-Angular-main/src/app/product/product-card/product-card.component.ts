// // product-card.component.ts
// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Router } from '@angular/router';
// import { Product } from '../product.model';

// @Component({
//   selector: 'app-product-card',
//   templateUrl: './product-card.component.html',
//   styleUrls: ['./product-card.component.css']
// })
// export class ProductCardComponent {
//   @Input() product!: Product;
//   @Output() addToCart = new EventEmitter<Product>();
//   @Output() addToWishlist = new EventEmitter<Product>();

//   constructor(private router: Router) {}

//   onViewDetails() {
//     this.router.navigate(['/products', this.product.id]);
//   }

//   onAddToCart() {
//     this.addToCart.emit(this.product);
//   }

//   onAddToWishlist() {
//     this.addToWishlist.emit(this.product);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  viewMode: 'cards' | 'table' = 'cards'; // Add view mode toggle

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

  // deleteProduct(id: number): void {
  //   if (confirm('Are you sure you want to delete this product?')) {
  //     this.service.delete(id).subscribe(() => {
  //       this.loadProducts();
  //     });
  //   }
  // }

  buyProduct(id: number): void {
    this.router.navigate(['/products', id, 'buy']);
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards';
  }
}