import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductServiceService } from '../../Services/ProductsSerivce/product-service.service';
import { Iproduct } from '../../Interfaces/iproduct';
import { forkJoin, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../Services/trans/translation.service';
import { Brand } from '../../Interfaces/brand';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    CommonModule,
    FormsModule,
    CarouselModule,
    BrandComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  discountPercentage = 10; // 10% discount
  url = 'http://localhost:5108/'; // MVC Image URL
  filterproducts: Iproduct[] = [];
  randomProducts: Iproduct[] = [];
  brands: Brand[] = [];
  page = 1;

  language: string = 'ar';
  languageChangeSubscription: Subscription | undefined;
  translate = inject(TranslateService);

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private _TranslationService: TranslationService
  ) {}

  ngOnInit(): void {
   

     this.language = this._TranslationService.getDefaultLang()?.[0] || 'ar';
    // listening for any language change happen
    this.loadProducts();
    this.getBrands();
    this.language = this._TranslationService.getDefaultLang()?.[0] || 'ar';
    // listening for any language change happen
    this.languageChangeSubscription =
      this._TranslationService.translateService.onLangChange.subscribe(
        (event: any) => {
          this.language = event.lang || 'ar';

          if (this.language === 'ar') {
            for (let i = 0; i < this.filterproducts.length; i++) {
              this.filterproducts[i].title = this.filterproducts[i].title_AR;
              this.filterproducts[i].description =
                this.filterproducts[i].description_AR;
            }
          } else {
            for (let i = 0; i < this.filterproducts.length; i++) {
              this.filterproducts[i].title = this.filterproducts[i].temp_Title;
              this.filterproducts[i].description =
                this.filterproducts[i].tem_description;
            }
          }
        }
      );
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 10,
        autoWidth: true
        
      }
    },
    nav: false
  }
  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }

  private loadProducts() {
    const pages = [
      this.page,
      this.page + 1,
      this.page + 2,
      this.page + 3,
      this.page + 4,
      this.page + 5,
      this.page + 6,
    ];
    forkJoin(
      pages.map((page) => this.productService.getAllProduct(page))
    ).subscribe({
      next: (results) => {
        results.forEach((res) => this.filterproducts.push(...res.entities));
        this.processProducts();

        for (let i = 0; i < this.filterproducts.length; i++) {
          this.filterproducts[i].temp_Title = this.filterproducts[i].title;
          this.filterproducts[i].title = this.filterproducts[i].title_AR;

          this.filterproducts[i].tem_description =
            this.filterproducts[i].description;
          this.filterproducts[i].description =
            this.filterproducts[i].description_AR;
        }
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        // Optionally handle errors in a user-friendly manner here
      },
    });
  }

  private processProducts() {
    this.randomProducts = this.selectRandomProducts(this.filterproducts, 10);
    console.log('All products count:', this.filterproducts.length);
    console.log('Random products count:', this.randomProducts.length);
  }

  private selectRandomProducts(
    products: Iproduct[],
    count: number
  ): Iproduct[] {
    // Implementing Fisher-Yates shuffle algorithm
    let array = products.slice(); // Create a copy of the array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array.slice(0, count); // Get first 'count' elements
  }

  private getBrands() {
    this.productService.getBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brands = res;
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        // Optionally handle errors in a user-friendly manner here
      },
    });
  }

  GoDetailspage(id: number) {
    this.router.navigate(['details', id]);
  }
}
