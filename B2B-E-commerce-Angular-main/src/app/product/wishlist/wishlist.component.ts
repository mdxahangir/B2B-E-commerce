import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from './wishlist.service';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishList: any[] = [];
  isLoading = false;
  errorMessage = '';

  //in future it will taken form AuthService
  userId = 1;

  constructor(
    private wishListService: WishListService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadWishList();
  }

  loadWishList(): void {
    this.isLoading = true;
    this.wishListService.getUserWishList(this.userId).subscribe({
      next: (data) => {
        this.wishList = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        this.errorMessage = 'Failed to load wish list.';
        this.isLoading = false;
      }
    });
  }

  addToCart(product: any): void {
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    };

    try {
      this.cartService.addItemToLocalCart(cartItem);
      this.toastr.success('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.toastr.error('Failed to add product to cart.');
    }
  }

  removeFromWishList(wishListId: number): void {
    this.wishListService.removeFromWishList(wishListId).subscribe({
      next: () => {
        this.toastr.success('Removed from wish list successfully.');
        this.loadWishList();
      },
      error: (error) => {
        console.error('Error removing from wishlist:', error);
        this.toastr.error('Failed to remove from wish list.');
      }
    });
  }
}
