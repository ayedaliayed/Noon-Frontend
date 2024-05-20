import { Component, OnInit, inject } from '@angular/core';
import { OrderhistoryService } from '../../Services/OrderHistory/orderhistory.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../Services/trans/translation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IOrder } from '../../Interfaces/Order/iorder';
import { IOrderItem } from '../../Interfaces/Order/iorder-item';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  translate = inject(TranslateService);
  language: string = 'ar';
  ordersItems: IOrderItem[] = [];

  languageChangeSubscription: Subscription | undefined;
  constructor(
    private _OrderhistoryService: OrderhistoryService,
    private _TranslationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.language = this._TranslationService.getDefaultLang()?.[0] || 'ar';
    this.languageChangeSubscription =
      this._TranslationService.translateService.onLangChange.subscribe(
        (event: any) => {
          this.language = event.lang || 'ar';
        }
      );

    this._OrderhistoryService.getAllOrders().subscribe({
      next: (res: any[]) => {
        // Assuming res is an array of any type
        console.log('Orders mmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].orderItems.length > 0) {
            // Explicitly specify the type of 'item' or let TypeScript infer it
            res[i].orderItems.forEach((item: any) => {
              this.ordersItems.push(item);
            });
          }
        }
        console.log(this.ordersItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  trackById(index: number, product: any): any {
    return product.id;
  }
}
