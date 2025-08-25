// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductService } from '../product.service';
// import { CartService } from '../cart/cart.service';
// import { ProductReviewService } from '../product-review.service';
// import { ProductReview } from '../product-review.model';
// import { WishListService } from '../wishlist/wishlist.service';

// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.css']
// })
// export class ProductDetailComponent implements OnInit {
//   product: any;
//   isLoading = true;
//   errorMessage = '';
//   isAddingToCart = false;
//   addToCartSuccess = false;

//   isAddingToWishList = false;
//   addToWishListSuccess = false;

//   reviews: ProductReview[] = [];
//   averageRating: number | null = null;
//   newReview: ProductReview = { rating: 5, comment: '' };

//   // Replace with your AuthService call in real app
//   currentUserId: number = 1;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productService: ProductService,
//     private cartService: CartService,
//     private reviewService: ProductReviewService,
//     private wishListService: WishListService
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       const productId = +id;
//       this.loadProduct(productId);
//       this.loadReviews(productId);
//       this.loadAverageRating(productId);
//     } else {
//       this.router.navigate(['/products']);
//     }
//   }

//   loadProduct(id: number): void {
//     this.isLoading = true;
//     this.productService.getById(id).subscribe({
//       next: (product) => {
//         this.product = product;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         this.errorMessage = 'Failed to load product details';
//         this.isLoading = false;
//         console.error(err);
//       }
//     });
//   }

//   addToCart() {
//     if (!this.product) return;

//     this.isAddingToCart = true;

//     try {
//       this.cartService.addToCart({
//         productId: this.product.id,
//         name: this.product.name,
//         price: this.product.price,
//         imageUrl: this.product.imageUrl,
//         quantity: 1
//       });

//       this.addToCartSuccess = true;
//       setTimeout(() => this.addToCartSuccess = false, 3000);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       this.errorMessage = 'Failed to add product to cart.';
//     } finally {
//       this.isAddingToCart = false;
//     }
//   }
  
//   addToWishList() {
//     this.isAddingToWishList = true;
//     const userId = 1; // বর্তমান লগইন করা ইউজারের ID
//     const productId = this.product.id;

//     this.wishListService.addToWishList(userId, productId).subscribe({
//       next: () => {
//         this.isAddingToWishList = false;
//         this.addToWishListSuccess = true;
//       },
//       error: (err) => {
//         console.error(err);
//         this.isAddingToWishList = false;
//       }
//     });
//   }

//   loadReviews(productId: number) {
//     this.reviewService.getReviewsByProduct(productId).subscribe(data => {
//       this.reviews = data;
//     });
//   }

//   loadAverageRating(productId: number) {
//     this.reviewService.getAverageRating(productId).subscribe(avg => {
//       this.averageRating = avg ? parseFloat(avg.toFixed(2)) : 0;
//     });
//   }

//   submitReview() {
//     if (!this.product || !this.product.id) return;

//     this.reviewService.addReview(this.newReview, this.product.id, this.currentUserId)
//       .subscribe(() => {
//         this.newReview = { rating: 5, comment: '' }; // reset form
//         this.loadReviews(this.product.id);
//         this.loadAverageRating(this.product.id);
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart/cart.service';
import { ProductReviewService } from '../product-review.service';
import { ProductReview } from '../product-review.model';
import { WishListService } from '../wishlist/wishlist.service';
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  isLoading = true;
  errorMessage = '';
  isAddingToCart = false;
  addToCartSuccess = false;

  isAddingToWishList = false;
  addToWishListSuccess = false;

  reviews: ProductReview[] = [];
  averageRating: number | null = null;
  newReview: ProductReview = { rating: 5, comment: '' };

  currentUserId: number = 1; // AuthService যুক্ত হলে এখান থেকে নিতে হবে

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private reviewService: ProductReviewService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId = +id;
      this.loadProduct(productId);
      this.loadReviews(productId);
      this.loadAverageRating(productId);
    } else {
      this.router.navigate(['/products']);
    }
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product details';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;

    this.isAddingToCart = true;

    try {
      const cartItem: CartItem = {
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        imageUrl: this.product.imageUrl,
        quantity: 1
      };

      this.cartService.addItemToLocalCart(cartItem);

      this.addToCartSuccess = true;
      setTimeout(() => this.addToCartSuccess = false, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.errorMessage = 'Failed to add product to cart.';
    } finally {
      this.isAddingToCart = false;
    }
  }

  addToWishList(): void {
    if (!this.product) return;

    this.isAddingToWishList = true;
    const productId = this.product.id;

    this.wishListService.addToWishList(this.currentUserId, productId).subscribe({
      next: () => {
        this.isAddingToWishList = false;
        this.addToWishListSuccess = true;
        setTimeout(() => this.addToWishListSuccess = false, 3000);
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
        this.isAddingToWishList = false;
        this.errorMessage = 'Failed to add to wishlist.';
      }
    });
  }

  loadReviews(productId: number): void {
    this.reviewService.getReviewsByProduct(productId).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
      }
    });
  }

  loadAverageRating(productId: number): void {
    this.reviewService.getAverageRating(productId).subscribe({
      next: (avg) => {
        this.averageRating = avg ? parseFloat(avg.toFixed(2)) : 0;
      },
      error: (err) => {
        console.error('Error loading average rating:', err);
      }
    });
  }

  submitReview(): void {
    if (!this.product || !this.product.id) return;

    this.reviewService.addReview(this.newReview, this.product.id, this.currentUserId).subscribe({
      next: () => {
        this.newReview = { rating: 5, comment: '' }; // reset form
        this.loadReviews(this.product.id);
        this.loadAverageRating(this.product.id);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.errorMessage = 'Failed to submit review.';
      }
    });
  }
}
