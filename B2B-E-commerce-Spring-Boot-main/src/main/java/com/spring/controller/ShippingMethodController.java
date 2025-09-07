package com.spring.controller;

import com.spring.model.ShippingMethod;
import com.spring.repository.ShippingMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shipping-methods")
@CrossOrigin(origins = "http://localhost:4200")
public class ShippingMethodController {

    @Autowired
    private ShippingMethodRepository shippingMethodRepository;

    
    @PostMapping
    public ShippingMethod create(@RequestBody ShippingMethod method) {
        return shippingMethodRepository.save(method);
    }

    
    @GetMapping
    public List<ShippingMethod> getAll() {
        return shippingMethodRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShippingMethod> getById(@PathVariable String id) {
        Optional<ShippingMethod> method = shippingMethodRepository.findById(id);
        return method.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShippingMethod> update(@PathVariable String id, @RequestBody ShippingMethod updatedMethod) {
        return shippingMethodRepository.findById(id)
            .map(existing -> {
                updatedMethod.setId(id); 
                return ResponseEntity.ok(shippingMethodRepository.save(updatedMethod));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (shippingMethodRepository.existsById(id)) {
            shippingMethodRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
