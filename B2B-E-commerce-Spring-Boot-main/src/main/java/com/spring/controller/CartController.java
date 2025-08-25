//package com.spring.controller;
//
//import com.spring.dto.CartResponse;
//import com.spring.dto.CreateCartRequest;
//import com.spring.service.CartService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/cart")
//@CrossOrigin(origins = "http://localhost:4200")
//public class CartController {
//
//    private final CartService cartService;
//
//    public CartController(CartService cartService) {
//        this.cartService = cartService;
//    }
//
//    // 🆕 ShippingMethod সহ কার্ট তৈরি
//    @PostMapping("/create")
//    public String createCartWithShipping(@RequestBody CreateCartRequest request) {
//        cartService.createCart(request.getProductIds(), request.getShippingMethodId(), request.getSessionToken());
//        return "Cart created successfully with shipping method.";
//    }
//
//    // Summary (with static shipping for now)
//    @PostMapping("/summary")
//    public CartResponse getCartSummary(@RequestBody List<Long> productIds) {
//        return cartService.getCartSummary(productIds);
//    }
//}
