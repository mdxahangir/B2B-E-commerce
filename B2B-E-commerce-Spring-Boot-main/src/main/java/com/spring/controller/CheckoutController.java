package com.spring.controller;

import com.spring.model.Checkout;
import com.spring.repository.AddressRepository;
import com.spring.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:4200")
public class CheckoutController {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @PostMapping
    public ResponseEntity<Checkout> create(@RequestBody Checkout checkout) {
        try {
            Checkout savedCheckout = checkoutRepository.save(checkout);
            return ResponseEntity.ok(savedCheckout);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping
    public List<Checkout> getAll() {
        return checkoutRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Checkout> getById(@PathVariable Long id) {
        Optional<Checkout> checkout = checkoutRepository.findById(id);
        return checkout.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Checkout> update(@PathVariable Long id, @RequestBody Checkout updatedCheckout) {
        return checkoutRepository.findById(id)
            .map(existing -> {
                updatedCheckout.setId(id);
                Checkout saved = checkoutRepository.save(updatedCheckout);
                return ResponseEntity.ok(saved);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (checkoutRepository.existsById(id)) {
            checkoutRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
