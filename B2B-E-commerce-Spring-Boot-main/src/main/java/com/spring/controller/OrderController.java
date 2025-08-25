package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.spring.model.Order;
import com.spring.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    @GetMapping("/buyer/{buyerId}")
    public List<Order> getOrdersByBuyer(@PathVariable Long buyerId) {
        return orderService.getOrdersByBuyer(buyerId);
    }

    @GetMapping("/seller/{sellerId}")
    public List<Order> getOrdersBySeller(@PathVariable Long sellerId) {
        return orderService.getOrdersBySeller(sellerId);
    }

    @PutMapping("/{orderId}/payment-status")
    public Order updatePaymentStatus(@PathVariable Long orderId, @RequestParam String status) {
        return orderService.updatePaymentStatus(orderId, status);
    }

    @PutMapping("/{orderId}/shipping-status")
    public Order updateShippingStatus(@PathVariable Long orderId, @RequestParam String status) {
        return orderService.updateShippingStatus(orderId, status);
    }
}
