//package com.spring.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.spring.model.Product;
//import com.spring.repository.ProductRepository;
//
//@Service
//public class ProductService {
//    
//    @Autowired
//    private ProductRepository productRepository;
//    
//    public Product getProductById(Long id) {
//        return productRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Product not found"));
//    }
//    
//    // Other product related methods...
//}
package com.spring.service;

import com.spring.model.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAll();
    Product getById(Long id);
    Product create(Product product);
    Product update(Long id, Product product);
    void delete(Long id);
}
