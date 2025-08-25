package com.spring.service;

import com.spring.model.ProductReview;
import java.util.List;

public interface ProductReviewService {
    ProductReview create(ProductReview review);
    List<ProductReview> getByProductId(Long productId);
    Double getAverageRating(Long productId);
}
