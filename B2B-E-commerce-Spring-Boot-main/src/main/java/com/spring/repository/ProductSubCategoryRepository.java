package com.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.model.ProductSubCategory;

import jakarta.transaction.Transactional;

@Repository(value = "ProductSubCategoryRepository")
@Transactional
public interface ProductSubCategoryRepository extends JpaRepository<ProductSubCategory, Long> {
	
}
