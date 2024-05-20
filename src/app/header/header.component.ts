import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../Components/change-password/change-password.component';
import { AuthComponent } from '../Components/auth/auth.component';
import { LocationComponent } from '../Components/location/location.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../Services/trans/translation.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../Components/category/category.component';
import { CartService } from '../Services/cart.service';
import { RegisterComponent } from '../Components/register/register.component';
import { FavoriteService } from '../Services/Favo/favorite.service';
import { UserService } from '../Services/user.service';
import { Iuser } from '../Interfaces/iuser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CategoryComponent,
    CommonModule,
    RouterLink,
    TranslateModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchText: string = '';
  isLoggedIn: boolean = true;
  currentLanguage: string;
  public totalItem: number = 0;
  public totalFav: number = 0;
  userData: Iuser = {} as Iuser;
  constructor(
    public dialog: MatDialog,
    private _AuthService: AuthService,
    private translateService: TranslateService,
    private _router: Router,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private favoriteService: FavoriteService
  ) {
    this.currentLanguage = 'en';
  }

  toggleLanguage() {
    if (this.currentLanguage === 'en') {
      this.translateService.use('ar');
      document.documentElement.setAttribute('dir', 'rtl');
      this.currentLanguage = 'ar';
    } else {
      this.translateService.use('en');
      document.documentElement.setAttribute('dir', 'ltr');
      this.currentLanguage = 'en';
    }
  }
  ngOnInit(): void {
    this._AuthService.getisloggedinBehaviorStaus().subscribe((status) => {
      this.isLoggedIn = status;
      console.log('sssssssssssssssssss', status);
    });
    if (this.isLoggedIn) {
      this.cartService.totalItems$.subscribe((totalItems) => {
        console.log(totalItems);
        this.totalItem = totalItems;
      });

      this.favoriteService.totalFav$.subscribe((totalFav) => {
        console.log(totalFav);
        this.totalFav = totalFav;
      });
      this.userService.getUserData().subscribe({
        next: (res: any) => {
          this.userData = res;
          console.log(this.userData);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
      this.cartService.getAllProfucts().subscribe({
        next: (res) => {
          this.totalItem = res.cartItems.length;
        },
      });
    } else {
      this.totalItem = Number(sessionStorage.getItem('Quantity'));
    }
    //favorite
    let userId = localStorage.getItem('appUserId');
    if (userId != null && this.isLoggedIn) {
      console.log(userId + 'userId');
      this.favoriteService.getFavoritesByUserId(userId).subscribe({
        next: (res) => {
          console.log(res.length);
          this.totalFav = res.length;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  

  logOut() {
    this._AuthService.logout();
    this.router.navigate(['/products']);
    this.totalFav = 0;
    this.totalItem = 0;
  }

  openAuthdDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  onInputChange() {
    let txt = this.searchText + '$';
    this._router.navigate(['products', txt]);
  }
  openLocationDialog(): void {
    const dialogLocationRef = this.dialog.open(LocationComponent, {
      width: '800px',
    });
    dialogLocationRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  isOrderPage(): boolean {
    return this.router.url.includes('/order');
  }

  isCartPage(): boolean {
    return this.router.url.includes('/cart');
  }
}
