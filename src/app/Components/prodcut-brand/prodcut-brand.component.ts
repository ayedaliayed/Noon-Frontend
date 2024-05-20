import { Component, inject } from '@angular/core';
import { ICategory } from '../../Interfaces/Category/icategory';
import { IProduct } from '../../Interfaces/Category/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../Services/Category/api.service';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { FavoriteService } from '../../Services/Favo/favorite.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductBrandService } from '../../Services/ProductBrand/product-brand.service';

@Component({
  selector: 'app-prodcut-brand',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './prodcut-brand.component.html',
  styleUrl: './prodcut-brand.component.css',
})
export class ProdcutBrandComponent {
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
  productBrand: any[] = [];
  url = 'http://localhost:5108/';
  // category:ICategory={} as ICategory;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiService: ApiService,
    private cartService: CartService,
    private _AuthService: AuthService,
    private _router: Router,
    private favoriteService: FavoriteService,
    private _productBrandService: ProductBrandService
  ) {}

  translate = inject(TranslateService);
  getRandomDate(): string {
    let randomNum = Math.floor(Math.random() * this.DataProduct.length);
    return this.DataProduct[randomNum];
  }

  ngOnInit(): void {
    this._AuthService.getisloggedinBehaviorStaus().subscribe((status) => {
      this.isLoggedIn = status;
      console.log('sssssssssssssssssss', status);
    });
    this._ActivatedRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(paramMap.get('id'));
      console.log( this.currentId)
      this._productBrandService.getProductBrands(this.currentId).subscribe({
        next: (res) => {
          // this.category=res;
          this.productBrand = res;
          console.log(this.productBrand, 'eaaaaaaaaaaaaaaaaaaaaaaaa');
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  //favorite

  GoDetailspage(id: number) {
    this._router.navigate(['details', id]);
  }
  trackById(index: number, product: any): any {
    return product.id;
  }
}
