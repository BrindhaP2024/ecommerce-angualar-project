import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { cart, priceSummary } from '../../interfaces/data-type';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
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
    console.log("User Data:", user);

    if (user.id) {
      this.productService.currentCart(user.id.toString()).subscribe(
        cartItems => {
          console.log("Cart Items Received:", cartItems); // Debug log
          this.cartData = cartItems || [];
          this.calculatePriceSummary();

          // Redirect to home if cart is empty
          if (this.cartData.length === 0) {
            this.router.navigate(['/']);
          }
        },
        error => {
          console.error("Error fetching cart data:", error);
        }
      );
    } else {
      console.warn("User ID not found in localStorage.");
    }
  }

  removeFromCart(cartId?: number): void {
    if (cartId) {
      this.productService.removeToCart(cartId).subscribe(() => {
        console.log(`Item with ID ${cartId} removed from cart`);
        this.loadCartDetails();
      });
    }
  }

  calculatePriceSummary(): void {
    console.log("Cart Data in Summary Calculation:", this.cartData);

    let totalPrice = this.cartData.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)), 0
    );

    this.priceSummary = {
      price: totalPrice,
      discount: totalPrice * 0.1,
      tax: totalPrice * 0.18,
      delivery: totalPrice > 0 ? 100 : 0,
      total: totalPrice - (totalPrice * 0.1) + (totalPrice * 0.18) + (totalPrice > 0 ? 100 : 0)
    };
  }

  checkout(): void {
    if (this.cartData.length > 0) {
      this.router.navigate(['/checkout']);
    } else {
      alert("Your cart is empty!");
    }
  }
}
