import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuType: string = 'default';
  userName: string = '';
  cartItems = 0;
  menuOpen: boolean = false;
  searchQuery: string = '';

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const admin = JSON.parse(sessionStorage.getItem('admin') || '{}');

    if (user && user.firstName) {
      this.userName = user.firstName;
      this.menuType = 'user';
      this.productService.getCartList(user.id);
    } else if (admin && admin.firstName) {
      this.userName = admin.firstName;
      this.menuType = 'admin';
    } else {
      this.menuType = 'default';
    }
    this.productService.cartData.subscribe((items: any[]) => {
      this.cartItems = items.length;
    });
  }

  userLogout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
    this.menuType = 'default';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery]);
    }
  }
}
