import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { product } from '../../interfaces/data-type';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuType: string = 'default';
  userName: string = '';
  cartItems = 0;
  menuOpen: boolean = false;
  searchQuery: string = '';
  searchResult: product[] = [];
  searchSubject = new Subject<string>();
  private searchSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadNavbarData();
    this.searchSubscription = this.searchSubject.pipe(debounceTime(300)).subscribe(query => {
      if (query.length > 2) {
        this.productService.searchProduct(query).subscribe((result: product[]) => {
          this.searchResult = result.slice(0, 5);
        });
      } else {
        this.searchResult = [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadNavbarData(): void {
    const user = sessionStorage.getItem('user');
    const admin = sessionStorage.getItem('admin');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.firstName;
      this.menuType = 'user';
      this.productService.getCartList(userData.id);
    } else if (admin) {
      const adminData = JSON.parse(admin);
      this.userName = adminData.firstName;
      this.menuType = 'admin';
    } else {
      this.menuType = 'default';
    }

    this.productService.cartData.subscribe((items: any[]) => {
      this.cartItems = items.length;
    });
  }

  userLogout(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('admin');
    this.router.navigate(['/login']);
    this.menuType = 'default';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  searchProduct(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value.trim());
  }

  redirectToDetails(id: number): void {
    this.router.navigate([`/details/${id}`]);
    this.searchResult = [];
  }

  hideSearch(): void {
    setTimeout(() => {
      this.searchResult = [];
    }, 200);
  }

  submitSearch(val: string): void {
    if (val.trim()) {
      this.router.navigate([`/search/${val}`]);
      this.searchResult = [];
    }
  }
}
