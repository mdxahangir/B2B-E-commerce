import { Component, OnInit } from '@angular/core';
import { ProductSubCategoryService } from '../product-sub-category.service';
import { ProductSubCategory } from '../product-sub-category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-sub-category-form',
  templateUrl: './product-sub-category-form.component.html',
  styleUrls: ['./product-sub-category-form.component.css']
})
export class ProductSubCategoryFormComponent implements OnInit {
  subCategory: ProductSubCategory = { name: '' };
  isEditMode = false;

  constructor(
    private service: ProductSubCategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.service.getById(+id).subscribe(data => {
        this.subCategory = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.service.update(this.subCategory.id!, this.subCategory).subscribe(() => {
        this.router.navigate(['/subcategories']);
      });
    } else {
      this.service.create(this.subCategory).subscribe(() => {
        this.router.navigate(['/subcategories']);
      });
    }
  }
}