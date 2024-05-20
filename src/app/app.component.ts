import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { SidemenuComponent } from './Components/sidemenu/sidemenu.component';
import { ProductsComponent } from './Components/Products/products/products.component';
import { AuthComponent } from './Components/auth/auth.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PaymentComponent } from './Components/payment/payment.component';
import { TranslationService } from './Services/trans/translation.service';
import { RestChangePasswordComponent } from './Components/rest-change-password/rest-change-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ProdcutBrandComponent } from './Components/prodcut-brand/prodcut-brand.component';
import { BrandComponent } from './Components/brand/brand.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    ChangePasswordComponent,
    RestChangePasswordComponent,
    ProfileComponent,
    SidemenuComponent,
    ProductsComponent,
    AuthComponent,
    GoogleMapsModule,
    PaymentComponent,
    ProdcutBrandComponent,
    BrandComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'NoonFrontEnd';

  translateService = inject(TranslationService);

  constructor() {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }
}
