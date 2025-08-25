import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  products = [
    { name: 'Product 1', description: 'Description 1', image: 'https://via.placeholder.com/150', type: 'all' },
    { name: 'Product 2', description: 'Description 2', image: 'https://via.placeholder.com/150', type: 'price-drop' },
    { name: 'Product 3', description: 'Description 3', image: 'https://via.placeholder.com/150', type: 'out-of-stock' },
    // Add more mock items here
  ];

  filteredProducts: any [] = [];
  activeFilter = 'all';
  counts = {
    all: 0,
    priceDrop: 0,
    outOfStock: 0
  };

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  pages: number[] = [];

  ngOnInit() {
    this.counts.all = this.products.length;
    this.counts.priceDrop = this.products.filter(p => p.type === 'price-drop').length;
    this.counts.outOfStock = this.products.filter(p => p.type === 'out-of-stock').length;
    this.filterItems('all');
  }

  filterItems(filter: string) {
    this.activeFilter = filter;
    const all = this.products;

    let filtered = filter === 'all' ? all : all.filter(p => p.type === filter);
    this.paginate(filtered);
  }

  paginate(items: any[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredProducts = items.slice(start, end);
    this.pages = Array(Math.ceil(items.length / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.pages.length) return;
    this.currentPage = page;
    this.filterItems(this.activeFilter);
  }

  exportFavorites() {
    console.log('Exporting favorites...');
  }

  clearAllFavorites() {
    this.products = [];
    this.counts = { all: 0, priceDrop: 0, outOfStock: 0 };
    this.filterItems('all');
  }

  get showPagination() {
    return this.pages.length > 1;
  }

}
