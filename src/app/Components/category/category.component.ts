import { Component, OnInit, inject } from '@angular/core';
import { ICategory } from '../../Interfaces/Category/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../Services/Category/api.service';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../Services/trans/translation.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  category: ICategory = {} as ICategory;
  testHidden: boolean = true;
  // selectedCategory:string="";
  showSubcategories: boolean = false;
  language: string = 'ar';
  languageChangeSubscription: Subscription | undefined;
  constructor(
    private _ApiService: ApiService,
    private _TranslationService: TranslationService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.language = this._TranslationService.getDefaultLang()?.[0] || 'en';
    this.languageChangeSubscription =
      this._TranslationService.translateService.onLangChange.subscribe(
        (event: any) => {
          this.language = event.lang || 'ar';
        }
      );
  }
  translate = inject(TranslateService);
  getCategoryById(catId: number) {
    this._ApiService.getCategoryId(catId).subscribe({
      next: (res) => {
        this.category = res;
        console.log('catId' + this.category);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategories(): void {
    // console.log("catrgotry");
    this._ApiService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toggleSubcategories(category: any): void {
    // category.showSubcategories = !category.showSubcategories;
    category.showSubcategories = category.showSubcategories;
  }
  toggleTestDisplay(value: boolean): void {
    this.testHidden = !value;
  }
}
