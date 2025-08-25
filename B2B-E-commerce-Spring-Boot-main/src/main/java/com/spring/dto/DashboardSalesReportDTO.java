package com.spring.dto;

import com.spring.model.OrderSummary;
import java.util.List;

public class DashboardSalesReportDTO {

    private Double totalSales;
    private Long totalOrders;
    private OrderSummary highestOrder;
    private List<OrderSummary> orders;

    public DashboardSalesReportDTO() {}

    public DashboardSalesReportDTO(Double totalSales, Long totalOrders, OrderSummary highestOrder, List<OrderSummary> orders) {
        this.totalSales = totalSales;
        this.totalOrders = totalOrders;
        this.highestOrder = highestOrder;
        this.orders = orders;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public OrderSummary getHighestOrder() {
        return highestOrder;
    }

    public void setHighestOrder(OrderSummary highestOrder) {
        this.highestOrder = highestOrder;
    }

    public List<OrderSummary> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderSummary> orders) {
        this.orders = orders;
    }
}
