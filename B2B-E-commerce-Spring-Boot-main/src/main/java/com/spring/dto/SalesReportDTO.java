package com.spring.dto;

public class SalesReportDTO {

    private String name;
    private Long totalQuantity;
    private Double totalAmount;

    public SalesReportDTO() {}

    public SalesReportDTO(String name, Long totalQuantity, Double totalAmount) {
        this.name = name;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
