import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'add-product', component: SellerAddProductComponent },
  { path: 'seller-update-product/:id', component: SellerUpdateProductComponent},
  { path: 'search/:query', component: SearchComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home'

  }
];
