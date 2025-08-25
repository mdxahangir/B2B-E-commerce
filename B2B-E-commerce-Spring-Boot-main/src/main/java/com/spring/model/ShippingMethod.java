package com.spring.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shipping_methods")
public class ShippingMethod {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private double price;

    public ShippingMethod() {}

    public ShippingMethod(String id, String name, String description, double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }    
    // Getters & Setters
    // ...

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}


}
