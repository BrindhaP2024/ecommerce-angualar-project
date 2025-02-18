// src/app/components/my-orders/my-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products.service';
import { order } from '../../interfaces/data-type';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData: order[] | undefined;
  loading: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.productService.orderList().subscribe({
      next: (orders) => {
        this.orderData = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
      }
    });
  }

  cancelOrder(orderId: number | undefined): void {
    if (orderId === undefined || orderId === null) {
      console.warn("Order ID is undefined or null, cannot cancel.");
      return;
    }

    this.loading = true;
    this.productService.cancelOrder(orderId).subscribe({
      next: (result) => {
        if (result) {
          this.loadOrders();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error canceling order:', error);
        this.loading = false;
      }
    });
  }
}
