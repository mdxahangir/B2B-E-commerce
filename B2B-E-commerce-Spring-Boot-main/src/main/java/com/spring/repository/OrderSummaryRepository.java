package com.spring.repository;

import com.spring.dto.SalesReportDTO;
import com.spring.model.OrderSummary;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderSummaryRepository extends JpaRepository<OrderSummary, Long> {

    @Query("SELECT new com.spring.dto.SalesReportDTO(o.name, SUM(o.quantity), SUM(o.total)) " +
           "FROM OrderSummary o GROUP BY o.name")
    List<SalesReportDTO> getSalesReport();
    
    // add for sales report
    @Query("SELECT o FROM OrderSummary o WHERE o.updateAt BETWEEN :startDate AND :endDate")
    List<OrderSummary> findAllBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    
}
