package com.spring.controller;

import com.spring.model.ProductSubCategory;
import com.spring.repository.ProductSubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/subcategories")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductSubCategoryController {

    @Autowired
    private ProductSubCategoryRepository subCategoryRepository;

    // Get all subcategories
    @GetMapping
    public List<ProductSubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll(); // EAGER fetch will include ProductCategory
    }

    // Get subcategory by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductSubCategory> getSubCategoryById(@PathVariable Long id) {
        Optional<ProductSubCategory> subCategory = subCategoryRepository.findById(id);
        return subCategory.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    // Create new subcategory
    @PostMapping
    public ProductSubCategory createSubCategory(@RequestBody ProductSubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

    // Update subcategory
    @PutMapping("/{id}")
    public ResponseEntity<ProductSubCategory> updateSubCategory(@PathVariable Long id,
                                                                @RequestBody ProductSubCategory subCategoryDetails) {
        Optional<ProductSubCategory> optionalSubCategory = subCategoryRepository.findById(id);
        if (optionalSubCategory.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ProductSubCategory subCategory = optionalSubCategory.get();
        subCategory.setName(subCategoryDetails.getName());
        subCategory.setProductCategory(subCategoryDetails.getProductCategory());
        subCategory.setUpdatedByCode(subCategoryDetails.getUpdatedByCode());
        subCategory.setUpdatedByName(subCategoryDetails.getUpdatedByName());
        subCategory.setUpdatedAt(new Date());

        ProductSubCategory updated = subCategoryRepository.save(subCategory);
        return ResponseEntity.ok(updated);
    }

    // Delete subcategory
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSubCategory(@PathVariable Long id) {
        Optional<ProductSubCategory> optionalSubCategory = subCategoryRepository.findById(id);
        if (optionalSubCategory.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        subCategoryRepository.delete(optionalSubCategory.get());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }
}
