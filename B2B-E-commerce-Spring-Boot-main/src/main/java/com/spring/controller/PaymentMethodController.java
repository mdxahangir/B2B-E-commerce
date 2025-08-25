package com.spring.controller;

import com.spring.model.PaymentMethod;
import com.spring.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment-methods")
@CrossOrigin(origins = "http://localhost:4200")// Angular বা অন্য client থেকে call করার জন্য
public class PaymentMethodController {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    // ✅ Create
    @PostMapping
    public PaymentMethod create(@RequestBody PaymentMethod method) {
        return paymentMethodRepository.save(method);
    }

    // ✅ Read All
    @GetMapping
    public List<PaymentMethod> getAll() {
        return paymentMethodRepository.findAll();
    }

    // ✅ Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethod> getById(@PathVariable String id) {
        Optional<PaymentMethod> method = paymentMethodRepository.findById(id);
        return method.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update
    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> update(@PathVariable String id, @RequestBody PaymentMethod updatedMethod) {
        return paymentMethodRepository.findById(id)
            .map(existing -> {
                updatedMethod.setId(id); // overwrite ID to ensure it doesn't change
                return ResponseEntity.ok(paymentMethodRepository.save(updatedMethod));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (paymentMethodRepository.existsById(id)) {
            paymentMethodRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
