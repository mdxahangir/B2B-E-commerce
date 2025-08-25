//package com.spring.service.impl;
//
//import com.spring.dto.CartItemDto;
//import com.spring.dto.CartResponse;
//import com.spring.model.CartItem;
//import com.spring.model.Product;
//import com.spring.model.ShippingMethod;
//import com.spring.model.ShoppingCart;
//import com.spring.repository.ProductRepository;
//import com.spring.repository.ShippingMethodRepository;
//import com.spring.repository.ShoppingCartRepository;
//import com.spring.service.CartService;
//
//import org.springframework.stereotype.Service;
//
//import java.sql.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class CartServiceImpl implements CartService {
//
//    private final ProductRepository productRepository;
//    private final ShippingMethodRepository shippingMethodRepository;
//    private final ShoppingCartRepository shoppingCartRepository;
//
//    public CartServiceImpl(ProductRepository productRepository,
//                           ShippingMethodRepository shippingMethodRepository,
//                           ShoppingCartRepository shoppingCartRepository) {
//        this.productRepository = productRepository;
//        this.shippingMethodRepository = shippingMethodRepository;
//        this.shoppingCartRepository = shoppingCartRepository;
//    }
//
//    @Override
//    public CartResponse getCartSummary(List<Long> productIds) {
//        List<Product> products = productRepository.findAllById(productIds);
//
//        List<CartItemDto> items = products.stream().map(product -> {
//            CartItemDto dto = new CartItemDto();
//            dto.setProductId(product.getId());
//            dto.setName(product.getName());
//            dto.setPrice(product.getPrice());
//            dto.setQuantity(1);
//            dto.setImageUrl(product.getImageUrl());
//            return dto;
//        }).collect(Collectors.toList());
//
//        double subtotal = items.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
//        double shipping = 50.0;
//        double tax = subtotal * 0.1;
//        double total = subtotal + shipping + tax;
//
//        CartResponse response = new CartResponse();
//        response.setItems(items);
//        response.setSubtotal(subtotal);
//        response.setShipping(shipping);
//        response.setTax(tax);
//        response.setTotal(total);
//
//        return response;
//    }
//
//    @Override
//    public void createCart(List<Long> productIds, String shippingMethodId, String sessionToken) {
//        ShippingMethod shippingMethod = shippingMethodRepository.findById(shippingMethodId)
//                .orElseThrow(() -> new RuntimeException("Shipping method not found"));
//
//        List<CartItem> cartItems = productRepository.findAllById(productIds).stream().map(product -> {
//            CartItem item = new CartItem();
//            item.setProduct(product);
//            item.setQuantity(1);
//            item.setDate(new Date(System.currentTimeMillis()));
//            item.setShippingMethod(shippingMethod);
//            return item;
//        }).collect(Collectors.toList());
//
//        ShoppingCart cart = new ShoppingCart();
//        cart.setCartItems(cartItems);
//        cart.setSessionToken(sessionToken);
//        cart.setShippingMethod(shippingMethod);
//
//        shoppingCartRepository.save(cart);
//    }
//}
