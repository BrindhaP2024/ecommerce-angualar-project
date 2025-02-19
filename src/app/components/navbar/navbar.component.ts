import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { product } from '../../interfaces/data-type';
import { CommonModule, NgIf } from '@angular/common';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInputRef!: ElementRef; // Search input reference

  menuType: string = 'default';
  userName: string = '';
  cartItems = 0;
  menuOpen: boolean = false;
  searchResult: product[] = [];
  searchSubject = new Subject<string>();
  private searchSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadNavbarData();

    // Handle search input debounce
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
    this.searchSubscription?.unsubscribe();
  }

  loadNavbarData(): void {
    const user = sessionStorage.getItem('user');
    const admin = sessionStorage.getItem('admin');

    if (user) {
      try {
        const userData = JSON.parse(user);
        this.userName = userData?.firstName || 'User';
        this.menuType = 'user';
        this.productService.getCartList(userData.id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else if (admin) {
      try {
        const adminData = JSON.parse(admin);
        this.userName = adminData?.firstName || 'Admin';
        this.menuType = 'admin';
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    } else {
      this.menuType = 'default';
    }

    // Updates cart count dynamically
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

  // searchProduct(event: KeyboardEvent): void {
  //   const input = event.target as HTMLInputElement;
  //   this.searchSubject.next(input.value.trim());
  // }

  searchProduct(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();

    if (query.length > 2) {
      this.searchSubject.next(query);
    } else {
      this.searchResult = [];
    }
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

  submitSearch(): void {
    const searchValue = this.searchInputRef.nativeElement.value.trim();
    console.log("Search Triggered:", searchValue);  // Debugging

    if (searchValue) {
      this.router.navigate(['/search', searchValue]);
      this.searchResult = [];
    }
  }
}
