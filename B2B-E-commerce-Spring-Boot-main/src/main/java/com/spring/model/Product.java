//package com.spring.model;
//
//import java.util.Date;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//@Entity(name = "product")
//@Table(name = "product")
//public class Product {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(name = "name")
//    private String name;
//    @Column(name = "image_url")
//    private String imageUrl;
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "product_category_id") // FK column name in 'product' table
//    private ProductCategory productCategory;
//
//    // 🔁 Join with ProductSubCategory
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "product_sub_category_id") // FK column name in 'product' table
//    private ProductSubCategory productSubCategory;
//    @Column(name = "description")
//    private String description;
//    @Column(name = "price")
//    private double price;
//    @Column(name = "quantity")
//    private int quantity;
//    @Column(name = "created_by_code")
//    private String createdByCode;
//    @Column(name = "created_by_name")
//    private String createdByName;
//    @Column(name = "update_at")
//    private Date updateAt;
//    
//    // Getters and setters
//    
//	public Long getId() {
//		return id;
//	}
//	public void setId(Long id) {
//		this.id = id;
//	}
//	public String getName() {
//		return name;
//	}
//	public void setName(String name) {
//		this.name = name;
//	}
//
//    public String getImageUrl() {
//        return imageUrl;
//    }
//
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }
//	public ProductCategory getProductCategory() {
//		return productCategory;
//	}
//	public void setProductCategory(ProductCategory productCategory) {
//		this.productCategory = productCategory;
//	}
//	public ProductSubCategory getProductSubCategory() {
//		return productSubCategory;
//	}
//	public void setProductSubCategory(ProductSubCategory productSubCategory) {
//		this.productSubCategory = productSubCategory;
//	}
//	public String getDescription() {
//		return description;
//	}
//	public void setDescription(String description) {
//		this.description = description;
//	}
//	public double getPrice() {
//		return price;
//	}
//	public void setPrice(double price) {
//		this.price = price;
//	}
//	public int getQuantity() {
//		return quantity;
//	}
//	public void setQuantity(int quantity) {
//		this.quantity = quantity;
//	}
//	public String getCreatedByCode() {
//		return createdByCode;
//	}
//	public void setCreatedByCode(String createdByCode) {
//		this.createdByCode = createdByCode;
//	}
//	public String getCreatedByName() {
//		return createdByName;
//	}
//	public void setCreatedByName(String createdByName) {
//		this.createdByName = createdByName;
//	}
//	public Date getUpdateAt() {
//		return updateAt;
//	}
//	public void setUpdateAt(Date updateAt) {
//		this.updateAt = updateAt;
//	} 
//}
package com.spring.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "created_by_code")
    private String createdByCode;
    @Column(name = "created_by_name")
    private String createdByName;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateAt = new Date();
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_category_id") // FK column name in 'product' table
    private ProductCategory productCategory;

    // 🔁 Join with ProductSubCategory
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_sub_category_id") // FK column name in 'product' table
    private ProductSubCategory productSubCategory;

    public Product() {}

    // Getters and setters for all fields

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
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
    
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
    
    public Date getUpdateAt() {
        return updateAt;
    }
    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

	public ProductSubCategory getProductSubCategory() {
		return productSubCategory;
	}

	public void setProductSubCategory(ProductSubCategory productSubCategory) {
		this.productSubCategory = productSubCategory;
	}
    

}
