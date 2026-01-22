import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public selectedCategory: string = 'all';
  public searchTerm: string = '';
  public sortBy: string = 'name';

  public categories = ['all', 'Electronics', 'Accessories'];

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products;

    // Filter by category
    if (this.selectedCategory != 'all') {
      this.filteredProducts = this.products.filter(
        p => p.category.toLowerCase() == this.selectedCategory
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      this.filteredProducts = this.filteredProducts.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm) ||
        p.description.toLowerCase().includes(this.searchTerm)
      );
    }

    if (this.sortBy === 'name') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'price-low') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      this.products.sort((a, b) => a.rating - b.rating);
    }
  }

  onCategoryChange() {
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  getDiscountedPrice(product: Product): number {
    if (product.discount) {
      return product.price - (product.price * product.discount / 100);
    }
    return product.price;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
  }

  getStockStatus(product: Product): string {
    if (product.stock > 50) {
      return 'In Stock';
    } else if (product.stock > 10) {
      return 'Low Stock';
    } else if (product.stock > 0) {
      return 'Very Low Stock';
    } else {
      return 'Out of Stock';
    }
  }

  getStockClass(product: Product): string {
    if (product.stock > 50) {
      return 'stock-high';
    } else if (product.stock > 10) {
      return 'stock-medium';
    } else if (product.stock > 0) {
      return 'stock-low';
    } else {
      return 'stock-out';
    }
  }

  calculateSavings(product: Product): number {
    if (product.discount) {
      return product.price * product.discount / 100;
    }
    return 0;
  }
}
