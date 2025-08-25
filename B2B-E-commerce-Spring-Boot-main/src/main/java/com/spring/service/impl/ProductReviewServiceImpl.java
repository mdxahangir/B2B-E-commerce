package com.spring.service.impl;

import com.spring.model.ProductReview;
import com.spring.repository.ProductReviewRepository;
import com.spring.service.ProductReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductReviewServiceImpl implements ProductReviewService {

    private final ProductReviewRepository reviewRepository;

    public ProductReviewServiceImpl(ProductReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public ProductReview create(ProductReview review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<ProductReview> getByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Double getAverageRating(Long productId) {
        return reviewRepository.findAverageRatingByProductId(productId);
    }
}

