// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product, ProductCategory, ProductSubCategory } from '../product.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductCategoryService } from '../product-category.service';
// import { ProductSubCategoryService } from '../product-sub-category.service';

// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.css']
// })
// export class ProductFormComponent implements OnInit {
//   product: Product = {
//     id: 0, // Initialize with default value
//     name: '',
//     imageUrl: '',
//     description: '',
//     price: 0,
//     quantity: 0
//   };
//   isEditMode = false;
//   categories: ProductCategory[] = [];
//   subCategories: ProductSubCategory[] = [];
//   selectedFile: File | null = null;
//   previewUrl: string | ArrayBuffer | null = null;

//   constructor(
//     private service: ProductService,
//     private categoryService: ProductCategoryService,
//     private subCategoryService: ProductSubCategoryService,
//     private route: ActivatedRoute,
//     public router: Router
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['id'];
//     if (id) {
//       this.isEditMode = true;
//       this.service.getById(+id).subscribe({
//         next: (data: Product) => {
//           this.product = data;
//           this.previewUrl = this.product.imageUrl || null;
//         },
//         error: (err) => {
//           console.error('Error loading product:', err);
//         }
//       });
//     }

//     this.loadCategories();
//     this.loadSubCategories();
//   }

//   loadCategories(): void {
//     this.categoryService.getAll().subscribe({
//       next: (data: ProductCategory[]) => {
//         this.categories = data;
//       },
//       error: (err) => {
//         console.error('Error loading categories:', err);
//       }
//     });
//   }

//   loadSubCategories(): void {
//     this.subCategoryService.getAll().subscribe({
//       next: (data: ProductSubCategory[]) => {
//         this.subCategories = data;
//       },
//       error: (err) => {
//         console.error('Error loading subcategories:', err);
//       }
//     });
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
//       this.selectedFile = file;
      
//       // Preview image
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.previewUrl = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   uploadImage(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if (!this.selectedFile) {
//         resolve();
//         return;
//       }

//       this.service.uploadImage(this.selectedFile).subscribe({
//         next: (response: { imageUrl: string }) => {
//           this.product.imageUrl = response.imageUrl;
//           resolve();
//         },
//         error: (err) => {
//           console.error('Image upload failed:', err);
//           reject(err);
//         }
//       });
//     });
//   }

//   async onSubmit(): Promise<void> {
//     try {
//       // Upload image first if it's a new product with a selected file
//       if (this.selectedFile && !this.isEditMode) {
//         await this.uploadImage();
//       }

//       if (this.isEditMode) {
//         if (!this.product.id) {
//           console.error('Product ID is required for update');
//           return;
//         }
        
//         await this.service.update(this.product.id, this.product).toPromise();
//       } else {
//         await this.service.create(this.product).toPromise();
//       }

//       this.router.navigate(['/products-management']);
//     } catch (err) {
//       console.error('Error saving product:', err);
//     }
//   }

//   compareById(item1: { id?: number }, item2: { id?: number }): boolean {
//     return item1 && item2 ? item1.id === item2.id : item1 === item2;
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product, ProductCategory, ProductSubCategory } from '../product.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductCategoryService } from '../product-category.service';
// import { ProductSubCategoryService } from '../product-sub-category.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.css']
// })
// export class ProductFormComponent implements OnInit {
//   product: Product = {
//     id: 0,
//     name: '',
//     imageUrl: '',
//     description: '',
//     price: 0,
//     quantity: 0,
//     productCategory: undefined,
//     productSubCategory: undefined
//   };
  
//   isEditMode = false;
//   categories: ProductCategory[] = [];
//   subCategories: ProductSubCategory[] = [];
//   selectedFile: File | null = null;
//   previewUrl: string | ArrayBuffer | null = null;

//   constructor(
//     private productService: ProductService,
//     private categoryService: ProductCategoryService,
//     private subCategoryService: ProductSubCategoryService,
//     private route: ActivatedRoute,
//     public router: Router,
//     private http: HttpClient
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['id'];
//     if (id) {
//       this.isEditMode = true;
//       this.loadProduct(+id);
//     }

//     this.loadCategories();
//     this.loadSubCategories();
//   }

//   loadProduct(id: number): void {
//     this.productService.getById(id).subscribe({
//       next: (data) => {
//         this.product = data;
//         this.previewUrl = this.product.imageUrl || 'assets/default-product.png';
//       },
//       error: (err) => console.error('Error loading product:', err)
//     });
//   }

//   loadCategories(): void {
//     this.categoryService.getAll().subscribe({
//       next: (data) => this.categories = data,
//       error: (err) => console.error('Error loading categories:', err)
//     });
//   }

//   loadSubCategories(): void {
//     this.subCategoryService.getAll().subscribe({
//       next: (data) => this.subCategories = data,
//       error: (err) => console.error('Error loading subcategories:', err)
//     });
//   }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => this.previewUrl = reader.result;
//       reader.readAsDataURL(file);
//     }
//   }

//   async uploadImage(file: File): Promise<string> {
//     const formData = new FormData();
//     formData.append('image', file); // Changed from 'file' to 'image' to match common backend expectations

//     try {
//       const response: any = await this.http.post('/api/products/upload', formData).toPromise();
//       return response.imageUrl;
//     } catch (error) {
//       console.error('Upload error details:', error);
//       throw error;
//     }
//   }

//   async onSubmit(): Promise<void> {
//     try {
//       // Upload image if selected (both for new and edit mode)
//       if (this.selectedFile) {
//         this.product.imageUrl = await this.uploadImage(this.selectedFile);
//       }

//       if (this.isEditMode) {
//         await this.productService.update(this.product.id, this.product).toPromise();
//       } else {
//         await this.productService.create(this.product).toPromise();
//       }

//       this.router.navigate(['/products-management']);
//     } catch (err) {
//       console.error('Error saving product:', err);
//       alert('Error saving product. Please try again.');
//     }
//   }

//   compareById(item1: any, item2: any): boolean {
//     return item1 && item2 ? item1.id === item2.id : item1 === item2;
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product, ProductCategory, ProductSubCategory } from '../product.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductCategoryService } from '../product-category.service';
// import { ProductSubCategoryService } from '../product-sub-category.service';

// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.css']
// })
// export class ProductFormComponent implements OnInit {
//   product: Product = {
//     id: 0,
//     name: '',
//     imageUrl: '',
//     description: '',
//     price: 0,
//     quantity: 0,
//     productCategory: undefined,
//     productSubCategory: undefined
//   };
  
//   isEditMode = false;
//   categories: ProductCategory[] = [];
//   subCategories: ProductSubCategory[] = [];
//   selectedFile: File | null = null;
//   previewUrl: string | ArrayBuffer | null = null;
//   isLoading = false;

//   constructor(
//     private service: ProductService,
//     private categoryService: ProductCategoryService,
//     private subCategoryService: ProductSubCategoryService,
//     private route: ActivatedRoute,
//     public router: Router
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['id'];
//     if (id) {
//       this.isEditMode = true;
//       this.loadProduct(+id);
//     }

//     this.loadCategories();
//     this.loadSubCategories();
//   }

//   loadProduct(id: number): void {
//     this.service.getById(id).subscribe({
//       next: (data) => {
//         this.product = data;
//         this.previewUrl = this.product.imageUrl || null;
//       },
//       error: (err) => console.error('Error loading product:', err)
//     });
//   }

//   loadCategories(): void {
//     this.categoryService.getAll().subscribe({
//       next: (data) => this.categories = data,
//       error: (err) => console.error('Error loading categories:', err)
//     });
//   }

//   loadSubCategories(): void {
//     this.subCategoryService.getAll().subscribe({
//       next: (data) => this.subCategories = data,
//       error: (err) => console.error('Error loading subcategories:', err)
//     });
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
      
//       const reader = new FileReader();
//       reader.onload = () => this.previewUrl = reader.result;
//       reader.readAsDataURL(this.selectedFile);
//     }
//   }

//   async onSubmit(): Promise<void> {
//     this.isLoading = true;

//     try {
//       const productJson = JSON.stringify({
//         name: this.product.name,
//         description: this.product.description,
//         price: this.product.price,
//         quantity: this.product.quantity,
//         productCategoryId: this.product.productCategory?.id,
//         productSubCategoryId: this.product.productSubCategory?.id,
//         createdByCode: 'admin001',
//         createdByName: 'Admin'
//       });

//       if (this.selectedFile) {
//         const response = await this.service.uploadImage(this.selectedFile, productJson).toPromise();
//         this.product.imageUrl = response.imageUrl;
//       } else {
//         alert("Please select an image file.");
//         return;
//       }

//       this.router.navigate(['/products-management']);

//     } catch (err) {
//       console.error('Error saving product:', err);
//       alert('Error saving product. Please try again.');
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   compareById(item1: any, item2: any): boolean {
//     return item1 && item2 ? item1.id === item2.id : item1 === item2;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, ProductCategory, ProductSubCategory } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from '../product-category.service';
import { ProductSubCategoryService } from '../product-sub-category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: undefined,
    productSubCategory: undefined
  };

  isEditMode = false;
  categories: ProductCategory[] = [];
  subCategories: ProductSubCategory[] = [];
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading = false;

  constructor(
    private service: ProductService,
    private categoryService: ProductCategoryService,
    private subCategoryService: ProductSubCategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadProduct(+id);
    }
    this.loadCategories();
    this.loadSubCategories();
  }

  loadProduct(id: number): void {
    this.service.getById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.previewUrl = this.product.imageUrl || null;
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadSubCategories(): void {
    this.subCategoryService.getAll().subscribe({
      next: (data) => this.subCategories = data,
      error: (err) => console.error('Error loading subcategories:', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.selectedFile) {
      alert('Please select an image file!');
      return;
    }

    this.isLoading = true;

    try {
      const productData = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity,
        createdByCode: 'admin001',
        createdByName: 'Admin',
        productCategoryId: this.product.productCategory?.id || 0,
        productSubCategoryId: this.product.productSubCategory?.id || 0
      };

      const response = await this.service.uploadProductWithImage(productData, this.selectedFile).toPromise();

      this.product.imageUrl = response.imageUrl || '';

      this.router.navigate(['/products-management']);
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Error saving product. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  compareById(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
}
