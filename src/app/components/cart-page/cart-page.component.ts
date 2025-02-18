import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { cart, priceSummary } from '../../interfaces/data-type';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] = [];
  priceSummary: priceSummary = { price: 0, discount: 0, tax: 0, delivery: 0, total: 0 };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      this.productService.currentCart(user.id).subscribe(cartItems => {
        this.cartData = cartItems;
        this.calculatePriceSummary();

        // Redirect to home if cart is empty
        if (this.cartData.length === 0) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  removeFromCart(cartId?: number): void {
    if (cartId) {
      this.productService.removeToCart(cartId).subscribe(() => {
        this.loadCartDetails();
      });
    }
  }

  // Calculate price summary (price, discount, tax, total)
  calculatePriceSummary(): void {
    let totalPrice = this.cartData.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    this.priceSummary = {
      price: totalPrice,
      discount: totalPrice * 0.1,
      tax: totalPrice * 0.18,
      delivery: 100,
      total: totalPrice - (totalPrice * 0.1) + (totalPrice * 0.18) + 100
    };
  }

  // Navigate to checkout page
  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
