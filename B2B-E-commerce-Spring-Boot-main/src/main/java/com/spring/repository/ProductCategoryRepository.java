package com.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.model.ProductCategory;

import jakarta.transaction.Transactional;

@Repository(value = "productCategoryRepository")
@Transactional
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
	
}
