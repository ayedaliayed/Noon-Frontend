// import { Component, OnChanges, OnInit, Output, EventEmitter, inject  } from '@angular/core';
// import { ProductServiceService } from '../../Services/ProductsSerivce/product-service.service';
// import { Router } from '@angular/router';
// import { Iproduct } from '../../Interfaces/iproduct';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { TranslationService } from '../../Services/trans/translation.service';
// import { TranslateModule } from '@ngx-translate/core';

// @Component({
//   selector: 'app-sidemenu',
//   standalone: true,
//   imports: [FormsModule, CommonModule,TranslateModule],
//   templateUrl: './sidemenu.component.html',
//   styleUrl: './sidemenu.component.css',
// })
// export class SidemenuComponent implements OnInit {
//   p1: number = 1;
//   p2: number = 2;
//   p3: number = 3;
//   minPrice: number = 0;
//   maxPrice: number = 0;
//   brandName: string = '';
//   filterproducts: Iproduct[] = [];
//   page: number = 1;
//   totalPage: number = 1;
//   discountPercentage: number = 10; // 10% discount
//   url = 'http://localhost:5108/'; // MVC Image URL
//   category: string = '';
//   translate=inject(TranslationService)
//   @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
//   constructor(
//     private _productServiceService: ProductServiceService,
//     private _router: Router
//   ) {}

//   onInputChange() {
//     const filters = {
//       minPrice: this.minPrice,
//       maxPrice: this.maxPrice,
//       brandName: this.brandName
//     };
//     this.filtersChanged.emit(filters);
//   }

//   ngOnInit(): void {
//     const Tog = document.getElementsByClassName('caret');
//     for (let i = 0; i < Tog.length; i++) {
//       Tog[i].addEventListener('click', function (this: HTMLElement) {
//         const nextElement = this.nextElementSibling;
//         if (nextElement) {
//           nextElement.classList.toggle('active');
//         }
//         this.classList.toggle('caret-down');
//       });
//     }
//   }
// }


import { Component, OnChanges, OnInit, Output, EventEmitter, inject  } from '@angular/core';
import { ProductServiceService } from '../../Services/ProductsSerivce/product-service.service';
import { Router } from '@angular/router';
import { Iproduct } from '../../Interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../Services/trans/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [FormsModule, CommonModule,TranslateModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent implements OnInit {
  p1: number = 1;
  p2: number = 2;
  p3: number = 3;
  minPrice: number = 0;
  maxPrice: number = 0;
  brandName: string = '';
  filterproducts: Iproduct[] = [];
  page: number = 1;
  totalPage: number = 1;
  discountPercentage: number = 10; // 10% discount
  url = 'http://localhost:5108/'; // MVC Image URL
  category: string = '';
  translate=inject(TranslationService)
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
  constructor(
    private _productServiceService: ProductServiceService,
    private _router: Router
  ) {}

  onInputChange() {
    const filters = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      brandName: this.brandName
    };
    this.filtersChanged.emit(filters);
  }

  ngOnInit(): void {
    const Tog = document.getElementsByClassName('caret');
    for (let i = 0; i < Tog.length; i++) {
      Tog[i].addEventListener('click', function (this: HTMLElement) {
        const nextElement = this.nextElementSibling;
        if (nextElement) {
          nextElement.classList.toggle('active');
        }
        this.classList.toggle('caret-down');
      });
    }
  }
}