import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { product } from '../../interfaces/data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productList: product[] | undefined;
  productMessage: string | undefined;
  iconDelete = faTrash;
  iconEdit = faEdit;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productMessage = 'Product has been deleted successfully!';
      this.listProducts();
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
    });
  }
}
