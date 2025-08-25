package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.spring.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBuyerId(Long buyerId);

    List<Order> findBySellerId(Long sellerId);
}
