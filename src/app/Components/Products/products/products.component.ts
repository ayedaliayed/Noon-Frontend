import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Iproduct } from '../../../Interfaces/iproduct';
import { ProductServiceService } from '../../../Services/ProductsSerivce/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidemenuComponent } from '../../sidemenu/sidemenu.component';
import { TranslationService } from '../../../Services/trans/translation.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../Services/Favo/favorite.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidemenuComponent, TranslateModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  language: string = 'ar';
  languageChangeSubscription: Subscription | undefined;
  p1: number = 1;
  p2: number = 2;
  p3: number = 3;
  favorites: any[] = [];
  productId: number = 0;
  filterproducts: Iproduct[] = [];
  page: number = 1;
  totalPage: number = 1;
  discountPercentage: number = 10; // 10% discount
  url = 'http://localhost:5108/'; // MVC Image URL
  category: string = '';
  translate = inject(TranslationService);

  constructor(
    private _productServiceService: ProductServiceService,
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _TranslationService: TranslationService,
    private favoriteService: FavoriteService
  ) {}

  onFiltersChanged(filters: any) {
    // Handle the filter values received from the side menu
    console.log('Filters changed:', filters);
    this._productServiceService
      .filterBrandPrice(
        this.page,
        filters.maxPrice,
        filters.minPrice,
        filters.brandName
      )
      .subscribe({
        next: (res) => {
          this.filterproducts = res.entities;

          this.totalPage = res.numberOfPages;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    // You can update your product list based on the new filters here
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const categoryParam = params.get('category');
      this.category = categoryParam || '';
      this.fetchProducts();
      this.getAllFavorites(); 
    });

    this.language = this._TranslationService.getDefaultLang()?.[0] || 'ar';

    /////////////////////////////////////////////////////////////////////
    //listening for any language change happen
    this.languageChangeSubscription =
      this._TranslationService.translateService.onLangChange.subscribe(
        (event: any) => {
          this.language = event.lang || 'ar';
        }
      );
  }

  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }

  onFilterChange(): void {}

  ///////////////////////////////////////////////////
  ////////////////////////////////////////////////
  /////////////////////////////////////////
  fetchProducts(): void {
    if (!this.category.includes('$')) {
      if (this.category !== '') {
        console.log(this.category, 'eeeeeeeeeeeeeeeeeeeeee');
        this._productServiceService
          .getAllFilteredProduct(this.page, this.category)
          .subscribe({
            next: (res) => {
              this.filterproducts = res.entities;
              this.totalPage = res.numberOfPages;
              //console.log(res);
            },
            error: (err) => {
              
            },
          });
      } else {
        this._productServiceService.getAllProduct(this.page).subscribe({
          next: (res) => {
            this.filterproducts = res.entities;
            this.totalPage = res.numberOfPages;
            console.log(res);
          },
          error: (err) => {
            
          },
        });
      }
    } else {
      let search = this.category.replace(/\$/g, '');
      this._productServiceService.search(this.page, search).subscribe({
        next: (res) => {
          this.filterproducts = res.entities;
          this.totalPage = res.numberOfPages;
          console.log(res);
        },
        error: (err) => {
          
        },
      });
    }
  }

  Previous() {
    if (this.category == '') {
      if (this.page > 1) {
        this.page -= 1;
        this.fetchProducts();
        this.updatePageNumbers();
      }
    } else {
      if (this.page > 1) {
        this.page -= 1;
        this.fetchProducts();
        this.updatePageNumbers();
      }
    }
  }

  next() {
    if (this.category == '') {
      if (this.page < this.totalPage) {
        this.page += 1;
        this.fetchProducts();
        this.updatePageNumbers();
      }
    } else {
      if (this.page < this.totalPage) {
        this.page += 1;
        this.fetchProducts();
        this.updatePageNumbers();
      }
    }
  }

  updatePageNumbers() {
    if (this.p1 > 1) {
      this.p1 -= 1;
    }
    if (this.p2 > 2 && this.p3 > 1) {
      this.p2 -= 1;
    }
    if (this.p3 > 3) {
      this.p3 -= 1;
    }
  }

  GoDetailspage(id: number) {
    this._router.navigate(['details', id]);
  }

  Go(p: number) {
    this.page = p;
    this.fetchProducts();
  }
  isFavorite(productId: number): boolean {
    return this.favorites.some((item) => item.productId === productId);
  }

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
}
