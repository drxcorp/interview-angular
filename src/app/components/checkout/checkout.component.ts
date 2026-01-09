import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  customerName: string = '';
  customerEmail: string = '';
  shippingAddress: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';

  totalPrice: number = 0;
  isProcessing: boolean = false;

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.cartService.cartItems.length === 0) {
      alert('Your cart is empty!');
      this.router.navigate(['/products']);
      return;
    }

    this.totalPrice = this.cartService.getTotalPrice();
  }

  submitOrder() {
    if (!this.customerName || !this.customerEmail || !this.shippingAddress) {
      alert('Please fill in all fields');
      return;
    }

    if (!this.customerEmail.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    this.isProcessing = true;

    setTimeout(() => {
      const order: Order = {
        id: Math.floor(Math.random() * 10000),
        items: this.cartService.getCartItems(),
        total: this.totalPrice,
        status: 'pending',
        customerName: this.customerName,
        customerEmail: this.customerEmail,
        shippingAddress: this.shippingAddress,
        createdAt: new Date()
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      this.cartService.clearCart();
      this.isProcessing = false;

      alert('Order placed successfully!');
      this.router.navigate(['/products']);
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  formatCardNumber() {
    // Basic formatting without proper implementation
    this.cardNumber = this.cardNumber.replace(/\s/g, '');
  }
}
