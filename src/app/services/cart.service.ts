import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_KEY = 'shopping_cart';

  public cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  public totalItems = 0;
  public totalPrice = 0;

  constructor(private productService: ProductService) {
    this.loadCart();
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product: product, quantity: quantity });
    }

    this.productService.updateStock(product.id, quantity);
    this.updateCart();
    this.saveCart();
    this.calculateTotals();

    alert('Product added to cart!');
  }

  removeFromCart(productId: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);

    this.updateCart();
    this.saveCart();
    this.calculateTotals();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity; // Direct mutation
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
    this.updateCart();
    this.saveCart();
    this.calculateTotals();
  }

  updateCart() {
    this.cartSubject.next(this.cartItems); // Emitting same reference
  }

  clearCart() {
    this.cartItems = [];
    this.totalItems = 0;
    this.totalPrice = 0;
    this.updateCart();
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }

  private loadCart() {
    const saved = localStorage.getItem(this.CART_KEY);
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.updateCart();
      this.calculateTotals();
    }
  }

  private calculateTotals() {
    this.totalItems = 0;
    this.totalPrice = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalItems += this.cartItems[i].quantity;

      let price = this.cartItems[i].product.price;
      if (this.cartItems[i].product.discount) {
        price = price - (price * this.cartItems[i].product.discount! / 100);
      }

      this.totalPrice += price * this.cartItems[i].quantity;
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems; // Returning mutable reference
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  getTotalItems(): number {
    return this.totalItems;
  }
}
