import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { SalesReportService } from './sales-report.service';
import { OrderSummary } from 'src/app/order/order-summary/order-summary.model';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  isLoading = true;
  errorMessage = '';

  filter: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';
  totalSales = 0;
  totalOrders = 0;
  highestOrder: OrderSummary | null = null;

  allData: OrderSummary[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    }
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Quantity Sold', backgroundColor: '#42A5F5' },
      { data: [], label: 'Total Sales ($)', backgroundColor: '#66BB6A' }
    ]
  };

  constructor(private salesReportService: SalesReportService) {}

  ngOnInit(): void {
    this.fetchReport();
  }

  fetchReport(): void {
    this.isLoading = true;
    this.salesReportService.getSalesReport().subscribe({
      next: (data) => {
        this.allData = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load sales report.';
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    const now = new Date();
    let filtered = this.allData.filter(item => item.updateAt != null);

    filtered = filtered.filter(item => {
      if (!item.updateAt) return false; 
      const updatedDate = new Date(item.updateAt);
      if (this.filter === 'daily') {
        return updatedDate.toDateString() === now.toDateString();
      } else if (this.filter === 'weekly') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return updatedDate >= weekAgo && updatedDate <= now;
      } else if (this.filter === 'monthly') {
        return updatedDate.getMonth() === now.getMonth() &&
               updatedDate.getFullYear() === now.getFullYear();
      } else if (this.filter === 'yearly') {
        return updatedDate.getFullYear() === now.getFullYear();
      }
      return true;
    });

    this.prepareChartData(filtered);
    this.totalSales = filtered.reduce((sum, item) => sum + (item.total ?? 0), 0);
    this.totalOrders = filtered.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    this.highestOrder = filtered.reduce((max, item) =>
      (!max || (item.total ?? 0) > (max.total ?? 0)) ? item : max, null as OrderSummary | null);
  }

  prepareChartData(data: OrderSummary[]): void {
    const labels = data.map(item => item.name ?? 'Unnamed Product');
    const quantities = data.map(item => item.quantity ?? 0);
    const totals = data.map(item => item.total ?? 0);

    this.barChartData = {
      labels: labels,
      datasets: [
        { data: quantities, label: 'Quantity Sold', backgroundColor: '#42A5F5' },
        { data: totals, label: 'Total Sales ($)', backgroundColor: '#66BB6A' }
      ]
    };
  }

  changeFilter(filter: 'daily' | 'weekly' | 'monthly' | 'yearly') {
    this.filter = filter;
    this.applyFilter();
  }
}
