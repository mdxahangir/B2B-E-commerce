package com.spring.controller;

import com.spring.dto.WishListRequest;
import com.spring.model.WishList;
import com.spring.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:4200")
public class WishListController {

    @Autowired
    private WishListService wishListService;
//
//    @PostMapping("/add")
//    public ResponseEntity<WishList> addToWishList(@RequestBody WishListRequest request) {
//        WishList added = wishListService.addToWishList(request.getUserId(), request.getProductId());
//        return ResponseEntity.ok(added);
//    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishList>> getUserWishList(@PathVariable Long userId) {
        List<WishList> list = wishListService.getUserWishList(userId);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromWishList(@PathVariable Long id) {
        wishListService.removeFromWishList(id);
        return ResponseEntity.noContent().build();
    }
}
