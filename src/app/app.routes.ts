import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/Products/products/products.component';
import { AuthComponent } from './Components/auth/auth.component';
import { authGuard } from './auth.guard';
import { AboutUsComponent } from './Components/About/about-us/about-us.component';
import { NotFoundComponent } from './Components/NotFound/not-found/not-found.component';
import { DetailsProductComponent } from './Components/details-product/details-product.component';
import { OrderComponent } from './Components/order/order.component';
import { HomeComponent } from './Components/home/home.component';
import { RestPasswordComponent } from './Components/rest-password/rest-password.component';
import { LocationComponent } from './Components/location/location.component';
import { RestChangePasswordComponent } from './Components/rest-change-password/rest-change-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductCategoryComponent } from './Components/product-category/product-category.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { FavoriteComponent } from './Components/favorite/favorite.component';
import { ProdcutBrandComponent } from './Components/prodcut-brand/prodcut-brand.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Home page
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details/:id', component: DetailsProductComponent },
  { path: 'order', component: OrderComponent, canActivate: [authGuard] },
  { path: 'restchange', component: RestChangePasswordComponent },
  {
    path: 'orderhistory',
    component: OrderHistoryComponent,
    canActivate: [authGuard],
  },
  { path: 'change', component: ChangePasswordComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'productBrand/:id',
    component: ProdcutBrandComponent,
  },
  { path: 'ProductCategory/:id', component: ProductCategoryComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'rest', component: RestPasswordComponent },
  { path: 'location', component: LocationComponent, canActivate: [authGuard] },
  { path: 'favorite', component: FavoriteComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent }, //not found page
];
