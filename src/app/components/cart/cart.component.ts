import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from './../../interfaces/data-type';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports:[CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: cart[] = [];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId: number | undefined) {
    if (cartId && this.cartData) {
      this.product.removeToCart(cartId).subscribe(() => {
        this.loadDetails();
      });
    }
  }

  loadDetails() {
    this.product.currentCart().subscribe((result: any[]) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item: { quantity: string | number; price: string | number; }) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
