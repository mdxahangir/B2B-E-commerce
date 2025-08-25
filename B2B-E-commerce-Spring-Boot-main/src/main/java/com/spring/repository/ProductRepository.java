//package com.spring.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.spring.model.Product;
//
//import jakarta.transaction.Transactional;
//
//@Repository("productRepository")
//@Transactional
//public interface ProductRepository extends JpaRepository<Product, Long> {
//
//}
package com.spring.repository;

import com.spring.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
