//package com.spring.controller;
//
//import com.spring.model.OrderSummary;
//import com.spring.repository.OrderSummaryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//
//@RequestMapping("/api/order-summaries")
//@CrossOrigin(origins = "http://localhost:4200")
//public class OrderSummaryController {
//
//    @Autowired
//    private OrderSummaryRepository orderSummaryRepository;
//
//    // ✅ Create Order Summary
//    @PostMapping
//    public OrderSummary create(@RequestBody OrderSummary orderSummary) {
//        return orderSummaryRepository.save(orderSummary);
//    }
//
//    // ✅ Read All Order Summaries
//    @GetMapping
//    public List<OrderSummary> getAll() {
//        return orderSummaryRepository.findAll();
//    }
//
//    // ✅ Read Single by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<OrderSummary> getById(@PathVariable Long id) {
//        Optional<OrderSummary> order = orderSummaryRepository.findById(id);
//        return order.map(ResponseEntity::ok)
//                    .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // ✅ Update
//    @PutMapping("/{id}")
//    public ResponseEntity<OrderSummary> update(@PathVariable Long id, @RequestBody OrderSummary updatedOrder) {
//        return orderSummaryRepository.findById(id)
//            .map(existing -> {
//                updatedOrder.setId(id); // Maintain ID
//                return ResponseEntity.ok(orderSummaryRepository.save(updatedOrder));
//            })
//            .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // ✅ Delete
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id) {
//        if (orderSummaryRepository.existsById(id)) {
//            orderSummaryRepository.deleteById(id);
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}
package com.spring.controller;

import com.spring.dto.SalesReportDTO;
import com.spring.model.OrderSummary;
import com.spring.repository.OrderSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-summaries")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderSummaryController {

    @Autowired
    private OrderSummaryRepository orderSummaryRepository;

    // ✅ Create Order Summary
    @PostMapping
    public OrderSummary create(@RequestBody OrderSummary orderSummary) {
        return orderSummaryRepository.save(orderSummary);
    }

    // ✅ Get All Order Summaries
    @GetMapping
    public List<OrderSummary> getAll() {
        return orderSummaryRepository.findAll();
    }

    // ✅ Get Single OrderSummary by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderSummary> getById(@PathVariable Long id) {
        Optional<OrderSummary> order = orderSummaryRepository.findById(id);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update OrderSummary by ID
    @PutMapping("/{id}")
    public ResponseEntity<OrderSummary> update(@PathVariable Long id, @RequestBody OrderSummary updatedOrder) {
        return orderSummaryRepository.findById(id)
                .map(existing -> {
                    // প্রতিটি ফিল্ড আলাদাভাবে সেট করা হচ্ছে, যাতে null overwrite না হয়
                    existing.setProductId(updatedOrder.getProductId());
                    existing.setName(updatedOrder.getName());
                    existing.setQuantity(updatedOrder.getQuantity());
                    existing.setTotal(updatedOrder.getTotal());
                    existing.setPaymentStatus(updatedOrder.getPaymentStatus());
                    existing.setShippingStatus(updatedOrder.getShippingStatus());
                    existing.setUpdateAt(updatedOrder.getUpdateAt());

                    OrderSummary savedOrder = orderSummaryRepository.save(existing);
                    return ResponseEntity.ok(savedOrder);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete OrderSummary by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (orderSummaryRepository.existsById(id)) {
            orderSummaryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
 // inside OrderSummaryController
    @GetMapping("/sales-report")
    public List<Map<String, Object>> getSalesReport() {
        List<OrderSummary> orders = orderSummaryRepository.findAll();
        List<Map<String, Object>> report = new ArrayList<>();
        for (OrderSummary order : orders) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", order.getName());
            item.put("quantity", order.getQuantity());
            item.put("total", order.getTotal());
            report.add(item);
        }
        return report;
    }


}

