//package com.spring.controller;
//
//import com.spring.model.Product;
//import com.spring.service.ProductService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.http.HttpStatus;
//
//import java.io.File;
//import java.io.IOException;
//import java.math.BigDecimal;
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/products")
//@CrossOrigin(origins = "http://localhost:4200")
//public class ProductController {
//
//    private final ProductService service;
//   
//
//    @Value("${upload.dir:uploads}")
//    private String uploadDir;
//
//    public ProductController(ProductService service) {
//        this.service = service;
//    }
//
//    @GetMapping
//    public List<Product> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/{id}")
//    public Product getById(@PathVariable Long id) {
//        return service.getById(id);
//    }
//
//    @PostMapping
//    public Product create(@RequestBody Product product) {
//        return service.create(product);
//    }
//
//    @PutMapping("/{id}")
//    public Product update(@PathVariable Long id, @RequestBody Product product) {
//        return service.update(id, product);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> delete(@PathVariable Long id) {
//        service.delete(id);
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<Product> uploadProductWithImage(
//            @RequestParam("name") String name,
//            @RequestParam("description") String description,
//            @RequestParam("price") String price,
//            @RequestParam("quantity") String quantity,
//            @RequestParam("createdByCode") String createdByCode,
//            @RequestParam("createdByName") String createdByName,
//            @RequestParam("productCategoryId") String productCategoryId,
//            @RequestParam("productSubCategoryId") String productSubCategoryId,
//            @RequestParam("image") MultipartFile file
//    ) {
//        try {
//            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
//
//            // ✅ Create upload directory under the current working directory if not exists
//            String absoluteUploadDir = new File(uploadDir).getAbsolutePath();
//            File uploadPath = new File(absoluteUploadDir);
//            if (!uploadPath.exists()) {
//                uploadPath.mkdirs();
//            }
//
//            File dest = new File(uploadPath, filename);
//            file.transferTo(dest);
//
//            Product product = new Product();
//            product.setName(name);
//            product.setDescription(description);
//            product.setPrice(new BigDecimal(price));
//            product.setQuantity(Integer.parseInt(quantity));
//            product.setCreatedByCode(createdByCode);
//            product.setCreatedByName(createdByName);
//            product.setProductCategory(Long.parseLong(productCategory));
//            product.setProductSubCategory(Long.parseLong(productSubCategory));
//
//            // ✅ Store relative path for frontend usage
//            product.setImageUrl("/uploads/" + filename);
//
//            Product savedProduct = service.create(product);
//            return ResponseEntity.ok(savedProduct);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//}
//
// ProductController.java (Corrected Full Code)
package com.spring.controller;

import com.spring.model.Product;
import com.spring.model.ProductCategory;
import com.spring.model.ProductSubCategory;
import com.spring.repository.ProductCategoryRepository;
import com.spring.repository.ProductSubCategoryRepository;
import com.spring.service.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService service;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductSubCategoryRepository productSubCategoryRepository;

    @Value("${upload.dir:uploads}")
    private String uploadDir;

    public ProductController(ProductService service,
                             ProductCategoryRepository productCategoryRepository,
                             ProductSubCategoryRepository productSubCategoryRepository) {
        this.service = service;
        this.productCategoryRepository = productCategoryRepository;
        this.productSubCategoryRepository = productSubCategoryRepository;
    }

    @GetMapping
    public List<Product> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return service.create(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return service.update(id, product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProductWithImage(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") String price,
            @RequestParam("quantity") String quantity,
            @RequestParam("createdByCode") String createdByCode,
            @RequestParam("createdByName") String createdByName,
            @RequestParam("productCategoryId") String productCategoryId,
            @RequestParam("productSubCategoryId") String productSubCategoryId,
            @RequestParam("image") MultipartFile file
    ) {
        try {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

            String absoluteUploadDir = new File(uploadDir).getAbsolutePath();
            File uploadPath = new File(absoluteUploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            File dest = new File(uploadPath, filename);
            file.transferTo(dest);

            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(new BigDecimal(price));
            product.setQuantity(Integer.parseInt(quantity));
            product.setCreatedByCode(createdByCode);
            product.setCreatedByName(createdByName);

            Long categoryId = Long.parseLong(productCategoryId);
            Long subCategoryId = Long.parseLong(productSubCategoryId);

            ProductCategory category = productCategoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("ProductCategory not found with id: " + categoryId));
            ProductSubCategory subCategory = productSubCategoryRepository.findById(subCategoryId)
                    .orElseThrow(() -> new RuntimeException("ProductSubCategory not found with id: " + subCategoryId));

            product.setProductCategory(category);
            product.setProductSubCategory(subCategory);

            product.setImageUrl("/uploads/" + filename);

            Product savedProduct = service.create(product);
            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
