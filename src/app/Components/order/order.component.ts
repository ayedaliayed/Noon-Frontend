import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';

import { IOrder } from '../../Interfaces/Order/iorder';
import { ApiOrderService } from '../../Services/Order/api-order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { Payment } from '../../Interfaces/Payment/payment';
import { Transaction } from '../../Interfaces/Payment/transaction';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../Services/trans/translation.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  order: IOrder = {} as IOrder;
  payment: Payment = {} as Payment;
  newPayment: Payment = {} as Payment;
  transaction: Transaction = {} as Transaction;
  language: string | null = 'en';

  constructor(
    private _ApiOrderService: ApiOrderService,
    private _translationService: TranslationService,
    private translateService: TranslateService
  ) {}

  translate = inject(TranslateService);

  url = environment.ApiUrl;
  ngOnInit(): void {
    console.log('_ApiOrderService');
    this.getOrder();
    this.language = this._translationService.getDefaultLang()?.[0] || 'en';
    this.translateService.onLangChange.subscribe(() => {
      this.language = this.translateService.currentLang;
      // this.getOrder(); // Fetch order data again when language changes
    });
  }
  RemoveOrder(OrderId: number) {
    this._ApiOrderService.DeleteFromOrder(OrderId).subscribe({
      next: (res) => {
        console.log(res)
        this._ApiOrderService.makeOrderRequest().subscribe({
          next: (re) => {
            this.order = re;
            console.log(re);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }
  getOrder() {
    this._ApiOrderService.makeOrderRequest().subscribe({
      next: (res) => {
        console.log(res);
        console.log('ppppppppppppppppppppppppppppppppppppp');
        this.order = res;
        console.log(this.order);
      },
      error: (err) => {
        console.log('ppppppppppppppppppppppppppppppppppppp');
        console.log(err);
      },
    });
  }
}
