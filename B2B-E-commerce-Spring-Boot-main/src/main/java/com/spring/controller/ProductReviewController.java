package com.spring.controller;

import com.spring.model.Product;
import com.spring.model.ProductReview;
import com.spring.model.User;
import com.spring.repository.ProductRepository;
import com.spring.repository.UserRepository;
import com.spring.service.ProductReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-reviews")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductReviewController {

    private final ProductReviewService reviewService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductReviewController(ProductReviewService reviewService,
                                   ProductRepository productRepository,
                                   UserRepository userRepository) {
        this.reviewService = reviewService;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ProductReview> createReview(
            @RequestBody ProductReview review,
            @RequestParam Long productId,
            @RequestParam Long userId) {

        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        review.setProduct(product);
        review.setCreatedBy(user);

        ProductReview savedReview = reviewService.create(review);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/product/{productId}")
    public List<ProductReview> getReviewsByProduct(@PathVariable Long productId) {
        return reviewService.getByProductId(productId);
    }

    @GetMapping("/product/{productId}/average-rating")
    public Double getAverageRating(@PathVariable Long productId) {
        return reviewService.getAverageRating(productId);
    }
}
