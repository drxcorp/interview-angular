import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor() {
    this.loadProducts();
    this.startAutoRefresh();
  }

  loadProducts() {
    this.products = [
      {
        id: 1,
        name: 'Laptop Pro 15',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD',
        price: 1299.99,
        image: 'https://via.placeholder.com/300x200?text=Laptop',
        category: 'Electronics',
        stock: 15,
        rating: 4.5,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        featured: true,
        tags: ['bestseller', 'new']
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with USB receiver',
        price: 29.99,
        image: 'https://via.placeholder.com/300x200?text=Mouse',
        category: 'Accessories',
        stock: 50,
        rating: 4.2,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 10
      },
      {
        id: 3,
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with blue switches',
        price: 149.99,
        image: 'https://via.placeholder.com/300x200?text=Keyboard',
        category: 'Accessories',
        stock: 30,
        rating: 4.8,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        featured: true
      },
      {
        id: 4,
        name: '4K Monitor',
        description: '27-inch 4K UHD monitor with HDR support',
        price: 449.99,
        image: 'https://via.placeholder.com/300x200?text=Monitor',
        category: 'Electronics',
        stock: 20,
        rating: 4.6,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI and SD card reader',
        price: 49.99,
        image: 'https://via.placeholder.com/300x200?text=Hub',
        category: 'Accessories',
        stock: 100,
        rating: 4.3,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 15
      },
      {
        id: 6,
        name: 'Webcam HD',
        description: '1080p webcam with built-in microphone',
        price: 79.99,
        image: 'https://via.placeholder.com/300x200?text=Webcam',
        category: 'Electronics',
        stock: 40,
        rating: 4.4,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    this.productsSubject.next(this.products);
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(p => p.id == id);
  }

  updateStock(productId: number, quantity: number) {
    setTimeout(() => {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.stock -= quantity;
        this.productsSubject.next(this.products);
      }
    }, Math.random() * 1000);
  }

  calculateDiscount(product: Product): number {
    if (product.discount) {
      return product.price * (100 - product.discount) * 0.01;
    }
    return product.price;
  }

  private startAutoRefresh() {
    setInterval(() => {
      console.log('Refreshing products...');
      this.productsSubject.next(this.products);
    }, 30000);
  }

  filterByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category);
  }

  searchProducts(term: string): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
