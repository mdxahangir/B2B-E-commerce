package com.spring.model;

import jakarta.persistence.*;

import java.util.Date;


@Entity(name = "product_category")
@Table(name = "product_category")
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "product_category_name")
    private String categoryName;
    @Column(name = "created_by_code")
    private String createdByCode;
    @Column(name = "created_by_name")
    private String createdByName;
    @Column(name = "created_at")
    private Date createdAt;
    
    
    @Column(name = "updated_by_code")
    private String updatedByCode;
	@Column(name = "updated_by_name")
    private String updatedByName;
    @Column(name = "updated_at")
    private Date updatedAt;
    
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCreatedByCode() {
		return createdByCode;
	}
	public void setCreatedByCode(String createdByCode) {
		this.createdByCode = createdByCode;
	}
	public String getCreatedByName() {
		return createdByName;
	}
	public void setCreatedByName(String createdByName) {
		this.createdByName = createdByName;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public String getUpdatedByCode() {
		return updatedByCode;
	}
	public void setUpdatedByCode(String updatedByCode) {
		this.updatedByCode = updatedByCode;
	}
	public String getUpdatedByName() {
		return updatedByName;
	}
	public void setUpdatedByName(String updatedByName) {
		this.updatedByName = updatedByName;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}


   
}
  
