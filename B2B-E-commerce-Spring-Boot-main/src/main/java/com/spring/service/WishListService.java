package com.spring.service;

import com.spring.model.WishList;
import java.util.List;

public interface WishListService {
    WishList addToWishList(Long userId, Long productId);
    List<WishList> getUserWishList(Long userId);
    void removeFromWishList(Long wishListId);
}