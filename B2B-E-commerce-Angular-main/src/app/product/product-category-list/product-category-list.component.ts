import { Component, OnInit } from "@angular/core";
import { ProductCategory } from "../product-category.model";
import { ProductCategoryService } from "../product-category.service";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  currentProductCategory: ProductCategory = {categoryName: ''};
  currentIndex = -1;
  name = '';

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.retrieveProductCategories();
  }

  // Fetch all product categories
  retrieveProductCategories(): void {
    this.productCategoryService.getAll()
      .subscribe({
        next: (data) => {
          this.productCategories = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Refresh the list
  refreshList(): void {
    this.retrieveProductCategories();
    this.currentProductCategory = {categoryName: ''};
    this.currentIndex = -1;
  }

  // Set active product category for editing
  setActiveProductCategory(productCategory: ProductCategory, index: number): void {
    this.currentProductCategory = productCategory;
    this.currentIndex = index;
  }

  // Delete all product categories
  removeAllProductCategories(): void {
    if(confirm('Are you sure you want to delete all categories?')) {
      this.productCategoryService.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
    }
  }

  // Search by name
  searchName(): void {
    this.currentProductCategory = {categoryName: ''};
    this.currentIndex = -1;

    this.productCategoryService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.productCategories = data;
          console.log('gtggggg', data);
        },
        error: (e) => console.error(e)
      });
  }

  // Delete single product category (new method)
  deleteProductCategory(id: any): void {
    if(confirm('Are you sure you want to delete this category?')) {
      this.productCategoryService.delete(id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
    }
  }
}