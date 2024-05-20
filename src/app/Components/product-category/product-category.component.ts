import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../Services/Category/api.service';
import { ICategory } from '../../Interfaces/Category/icategory';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Interfaces/Category/iproduct';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { FavoriteService } from '../../Services/Favo/favorite.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent implements OnInit {
  currentId: number = 0;
  categories: ICategory[] = [];
  products: IProduct[] = [];
  DataProduct: string[] = ['15 April', '20June', '1May', '5July'];
  isLoggedIn: boolean = false;
  currentNumber: number = 1;
  GetPrdId: number = 0;
  product: IProduct | null = null;
  date: string = '';
  productId: number = 0;
  favorites: any[] = [];
  flag: boolean = false;

  url = 'http://localhost:5108/';
  // category:ICategory={} as ICategory;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiService: ApiService,
    private cartService: CartService,
    private _AuthService: AuthService,
    private _router: Router,
    private favoriteService: FavoriteService
  ) {}

  translate = inject(TranslateService);
  getRandomDate(): string {
    let randomNum = Math.floor(Math.random() * this.DataProduct.length);
    return this.DataProduct[randomNum];
  }

  ngOnInit(): void {
    this.getAllFavorites();

    this._AuthService.getisloggedinBehaviorStaus().subscribe((status) => {
      this.isLoggedIn = status;
      console.log('sssssssssssssssssss', status);
    });
    this._ActivatedRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(paramMap.get('id'));
      this._ApiService.getCategoryId(this.currentId).subscribe({
        next: (res) => {
          // this.category=res;
          this.products = res;
          console.log(this.products, 'eaaaaaaaaaaaaaaaaaaaaaaaa');
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  //favorite
  addFavorite(productId: number) {
    let userId = localStorage.getItem('appUserId');
    if (!userId) {
      console.error('userId');
      return;
    }
    this.productId = productId;

    this.favoriteService.addFavorite(userId, this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllFavorites();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFavorite(productId: number) {
    let userId = localStorage.getItem('appUserId');
    if (!userId) {
      console.error('userId');
      return;
    }
    this.productId = productId;

    this.favoriteService.deleteFavorite(userId, this.productId).subscribe({
      next: (res) => {
        this.getAllFavorites();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllFavorites() {
    let userId = localStorage.getItem('appUserId');
    if (!userId) {
      console.error('userId');
      return;
    }
    this.favoriteService.getFavoritesByUserId(userId).subscribe({
      next: (res) => {
        this.favorites = res;
        console.log(this.favorites);
        this.favoriteService.updatetotalFav(this.favorites.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isFavorite(productId: number): boolean {
    return this.favorites.some((item) => item.productId === productId);
  }

  createCart(GetPrdId: number): void {
    if (this.isLoggedIn) {
      console.log('session');

      let storedProducts = JSON.parse(
        sessionStorage.getItem('product') || '[]'
      ) as number[]; // Ensure storedProducts is initialized as an array
      let storedQuantities = JSON.parse(
        sessionStorage.getItem('Quantity') || '{}'
      );

      if (Array.isArray(storedProducts) && storedProducts.length > 0) {
        // Check if storedProducts is an array
        console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppp');
        this.cartService.createCart().subscribe({
          next: (res) => {
            console.log(res.cartId);
            console.log(GetPrdId);
            storedProducts.forEach((productId: number) => {
              let quantity = storedQuantities[productId] || 0;
              this.cartService
                .addtoCart(productId, res.cartId, quantity)
                .subscribe({
                  next: (res) => {
                    console.log(res + 'cart');
                    this.cartService.getItems().subscribe({
                      next: (re) => {
                        
                        console.log(res);
                        console.log(re.cartItems.length);
                        this.cartService.updateTotalItems(re.cartItems.length);
                        
                      },
                      error: (er) => {
                        console.log(er); // Handle error
                      },
                    });
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
            });

            sessionStorage.removeItem('product');
            sessionStorage.removeItem('Quantity');
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.cartService.createCart().subscribe({
          next: (res) => {
            console.log(res.cartId);
            console.log(GetPrdId);
            this.cartService.addtoCart(GetPrdId, res.cartId, 1).subscribe({
              next: (tr) => {
                this.cartService.getItems().subscribe({
                  next: (re) => {
                    
                    console.log(res);
                    console.log(re.cartItems.length);
                    this.cartService.updateTotalItems(re.cartItems.length);
                    
                  },
                  error: (er) => {
                    console.log(er); // Handle error
                  },
                });
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    } else {
      console.log('logout session');
      let storedProducts = JSON.parse(
        sessionStorage.getItem('product') || '[]'
      ) as number[]; // Ensure storedProducts is initialized as an array
      let storedQuantities = JSON.parse(
        sessionStorage.getItem('Quantity') || '{}'
      );
      storedProducts.push(GetPrdId);
      storedQuantities[GetPrdId] = 0;
      sessionStorage.setItem('product', JSON.stringify(storedProducts));
      sessionStorage.setItem('Quantity', JSON.stringify(storedQuantities));
    }
  }

  GoDetailspage(id: number) {
    this._router.navigate(['details', id]);
  }
  trackById(index: number, product: any): any {
    return product.id;
  }
}
