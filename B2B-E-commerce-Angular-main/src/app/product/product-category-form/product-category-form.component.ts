import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../product-category.model';
import { ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {
  productCategory: ProductCategory = {
    id: undefined,
    categoryName: ''
  };
  isEditMode = false;
  message = '';
  isLoading = false;

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.getProductCategory(id);
    }
  }

  getProductCategory(id: string): void {
    this.isLoading = true;
    this.productCategoryService.get(id)
      .subscribe({
        next: (data) => {
          this.productCategory = data;
          this.isLoading = false;
        },
        error: (e) => {
          console.error(e);
          this.message = 'Failed to load product category';
          this.isLoading = false;
        }
      });
  }

  saveProductCategory(): void {
    this.message = '';
    this.isLoading = true;

    if (this.isEditMode && this.productCategory.id) {
      this.updateProductCategory();
    } else {
      this.createProductCategory();
    }
  }

  createProductCategory(): void {
    this.productCategoryService.create(this.productCategory)
      .subscribe({
        next: () => {
          this.message = 'Product Category created successfully!';
          this.isLoading = false;
          this.router.navigate(['/product-categories']);
        },
        error: (e) => {
          console.error(e);
          this.message = 'Failed to create product category';
          this.isLoading = false;
        }
      });
  }

  updateProductCategory(): void {
    if (!this.productCategory.id) {
      this.message = 'Invalid product category ID';
      this.isLoading = false;
      return;
    }

    this.productCategoryService.update(this.productCategory.id, this.productCategory)
      .subscribe({
        next: () => {
          this.message = 'Product Category updated successfully!';
          this.isLoading = false;
          this.router.navigate(['/product-categories']);
        },
        error: (e) => {
          console.error(e);
          this.message = 'Failed to update product category';
          this.isLoading = false;
        }
      });
  }
}