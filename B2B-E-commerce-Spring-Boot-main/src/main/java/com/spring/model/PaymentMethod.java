package com.spring.model;

import jakarta.persistence.*;

@Entity
@Table(name = "payment_methods")
public class PaymentMethod {

    @Id
    private String id; // উদাহরণ: cod, card, bkash

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    // Constructors
    public PaymentMethod() {}

    public PaymentMethod(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }    // Getters & Setters
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


}
