package com.spring.service;

import java.util.List;
import com.spring.model.Order;

public interface OrderService {

    Order placeOrder(Order order);

    List<Order> getOrdersByBuyer(Long buyerId);

    List<Order> getOrdersBySeller(Long sellerId);

    Order updatePaymentStatus(Long orderId, String status);

    Order updateShippingStatus(Long orderId, String status);
}
