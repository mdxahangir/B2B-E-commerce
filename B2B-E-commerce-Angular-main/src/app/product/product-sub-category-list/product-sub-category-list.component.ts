import { Component, OnInit } from '@angular/core';
import { ProductSubCategoryService } from '../product-sub-category.service';
import { ProductSubCategory } from '../product-sub-category.model';

@Component({
  selector: 'app-product-sub-category-list',
  templateUrl: './product-sub-category-list.component.html',
  styleUrls: ['./product-sub-category-list.component.css']
})
export class ProductSubCategoryListComponent implements OnInit {
  subCategories: ProductSubCategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private service: ProductSubCategoryService) { }

  ngOnInit(): void {
    this.loadSubCategories();
  }

  loadSubCategories(): void {
    this.service.getAll().subscribe(data => {
      this.subCategories = data;
    });
  }

  deleteSubCategory(id: number): void {
    if (confirm('Are you sure you want to delete this sub-category?')) {
      this.service.delete(id).subscribe(() => {
        this.loadSubCategories();
      });
    }
  }
}