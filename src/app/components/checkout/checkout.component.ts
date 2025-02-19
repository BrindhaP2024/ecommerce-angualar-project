import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { cart, order } from '../../interfaces/data-type';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  selectedPayment: string = '';  // New: Store selected payment method

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe({
      next: (result) => {
        let price = 0;
        this.cartData = result;

        result.forEach((item) => {
          if (item.quantity) {
            price += (item.price * item.quantity);
          }
        });
        this.totalPrice = price + (price / 10) + 100 - (price / 10);
      },
      error: (error) => {
        console.error('Error fetching cart data:', error);
      }
    });
  }

  orderNow(data: { email: string; address: string; contact: string }): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (userId && this.totalPrice > 0) {
      if (!this.selectedPayment) {
        this.orderMsg = "Please select a payment method.";
        setTimeout(() => (this.orderMsg = undefined), 3000);
        return;
      }

      const orderData: order = {
        id: 0,
        userId: userId,
        totalPrice: this.totalPrice,
        status: 'pending',
        orderDate: new Date(),
        email: data.email,
        address: data.address,
        contact: data.contact,
        paymentMethod: this.selectedPayment
      };

      this.product.orderNow(orderData).subscribe({
        next: (result) => {
          if (result) {
            this.orderMsg = "Order has been placed successfully!";
            if (this.cartData) {
              this.cartData.forEach(item => {
                if (item.id !== undefined && item.id !== null) {
                  this.product.deleteCartItems(item.id);
                }
              });
            }

            setTimeout(() => {
              this.orderMsg = undefined;
              this.router.navigate(['/my-orders']);
            }, 4000);
          }
        },
        error: (error) => {
          console.error('Error placing order:', error);
          this.orderMsg = 'Order placement failed. Please try again.';
        }
      });
    } else {
      this.orderMsg = "Please login to place an order.";
      setTimeout(() => {
        this.orderMsg = undefined;
        this.router.navigate(['/login']);
      }, 4000);
    }
  }
}
