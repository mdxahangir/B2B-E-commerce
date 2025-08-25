package com.spring.service.impl;

import com.spring.model.Product;
import com.spring.model.User;
import com.spring.model.WishList;
import com.spring.repository.ProductRepository;
import com.spring.repository.UserRepository;
import com.spring.repository.WishListRepository;
import com.spring.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WishListServiceImpl implements WishListService {

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public WishList addToWishList(Long userId, Long productId) {
        if (wishListRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product already in Wish List");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        WishList wishList = new WishList();
        wishList.setUser(user);
        wishList.setProduct(product);
        return wishListRepository.save(wishList);
    }

    @Override
    public List<WishList> getUserWishList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return wishListRepository.findByUser(user);
    }

    @Override
    public void removeFromWishList(Long wishListId) {
        wishListRepository.deleteById(wishListId);
    }
}
