import { Router, RouterLink } from '@angular/router';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { cart } from '../../interfaces/data-type';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, RouterLink, ContactFormComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: true,
})
export class HomepageComponent implements OnInit {
  products: any[] = [];
  cart: number = 0;
  trackByProductId: TrackByFunction<any> = (index, product) => product.id;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.productList().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/details', productId]);
  }

  addToCart(product: any): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userId = user.id;

    if (userId) {
      const cartData: cart = {
        ...product,
        productId: product.id,
        userId,
      };
      delete cartData.id;
      this.productService.addToCart(cartData).subscribe(() => {
        alert(`${product.name} has been added to your cart!`);
        this.productService.getCartList(userId);
      });
    } else {
      alert('Please login to add items to your cart.');
    }
  }

  buyNow(product: any): void {
    alert(`You have chosen to buy ${product.name}!`);
  }
}
