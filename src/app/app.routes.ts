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
import { CartComponent } from './components/cart/cart.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'homepage', pathMatch:'full' },
  { path: 'productpage', component: HomepageComponent },
  { path:"dashboard",component:DashboardComponent},
  {path:'contact-form',component:ContactFormComponent} ,
   {path:'cart',component:CartComponent},
  // {path:'productdetails',component:ProductDetailsComponent},
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {component:SellerAddProductComponent,
    path:'selleraddproduct',

  },{
    component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
},
{
  component: SearchComponent,
  path:'search/:query'
},
{
  path:'checkout',component:CheckoutComponent
},
{
  path:'my-orders',
  component:MyOrdersComponent
},

  { path: '**', redirectTo: 'login',title:'Not-found'}
];
