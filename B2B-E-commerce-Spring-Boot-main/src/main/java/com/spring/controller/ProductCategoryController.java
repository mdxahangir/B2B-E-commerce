package com.spring.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spring.model.ProductCategory;
import com.spring.repository.ProductCategoryRepository;

import java.util.*;

@RestController
@RequestMapping("/api/product/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductCategoryController {


    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    // Get all productCategories
    @GetMapping
    public List<ProductCategory> getAllProductCategories() {
        return productCategoryRepository.findAll();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductCategory> getProductCategoryById(@PathVariable Long id) {
        Optional<ProductCategory> productCategory = productCategoryRepository.findById(id);
        return productCategory.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // Create new product
    @PostMapping
    public ProductCategory createProductCategory(@RequestBody ProductCategory ProductCategory) {
        return productCategoryRepository.save(ProductCategory);
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<ProductCategory> updateProduct(@PathVariable Long id,
                                                 @RequestBody ProductCategory productCategoryDetails) {
        Optional<ProductCategory> optionalProduct = productCategoryRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // set current date as updated date
        ProductCategory productCategory = optionalProduct.get();
        productCategory.setCategoryName(productCategoryDetails.getCategoryName());
        
        productCategory.setCreatedByCode(productCategoryDetails.getCreatedByCode());
        productCategory.setCreatedByName(productCategoryDetails.getCreatedByName());
        productCategory.setCreatedAt(new Date()); // set current date as updated date
        // set current date as updated date
        productCategory.setUpdatedByCode(productCategoryDetails.getUpdatedByCode());
        productCategory.setUpdatedByName(productCategoryDetails.getUpdatedByName());
        productCategory.setUpdatedAt(new Date());

        ProductCategory updatedProductCategory = productCategoryRepository.save(productCategory);
        return ResponseEntity.ok(updatedProductCategory);
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProductCategory(@PathVariable Long id) {
        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findById(id);
        if (optionalProductCategory.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        productCategoryRepository.delete(optionalProductCategory.get());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }
}
