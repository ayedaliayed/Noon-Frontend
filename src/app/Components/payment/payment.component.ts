import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Iuser } from '../../Interfaces/iuser';
import { ApiOrderService } from '../../Services/Order/api-order.service';
import { IOrder } from '../../Interfaces/Order/iorder';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Payment } from '../../Interfaces/Payment/payment';
import { Transaction } from '../../Interfaces/Payment/transaction';
import { PaymentService } from '../../Services/payment.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../Services/trans/translation.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, TranslateModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  amount = 0;
  userData: Iuser = {} as Iuser;
  order: IOrder = {} as IOrder;
  payment: Payment = {} as Payment;
  newPayment: Payment = {} as Payment;
  transaction: Transaction = {} as Transaction;
  language: string = 'ar';
  languageChangeSubscription: Subscription | undefined;
  url = environment.ApiUrl;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(
    private router: Router,
    private userService: UserService,
    private _ApiOrderService: ApiOrderService,
    private _paymentService: PaymentService,
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
    // this.amount = this.payment.totalAmount;
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: 1,
                  currency: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.payed();
          });
        },
        onError: (error: any) => {
          console.log(error);
          this.payed();
        },
      })
      .render(this.paymentRef.nativeElement);

    this.userService.getUserData().subscribe({
      next: (res: any) => {
        this.userData = res;
        console.log(this.userData);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
    this.getOrder();
    
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
  payed() {
    if (!this.order) {
      alert('No Order ,please Place order and continue');
      return;
    }

    this.payment.name = 'paypal';
    this.payment.description = 'Cash On paypal';
    this.payment.isActive = true;
    this.payment.isDeleted = false;

    this._paymentService.addPaymentMethod(this.payment).subscribe({
      next: (res) => {
        alert('Payment successful');
        this.order.id = res.entity.id;
        this.transaction.amount = this.order.total;
        this.transaction.orderID = this.order.id;
        this.transaction.paymentMethodID = 2;
        this.transaction.transactionStatus = 'has been shipped';
        console.log(
          '----------------------------------------------------------------------------'
        );
        console.log('new payment method');
        console.log(this.order);

        this.transaction = {
          amount: this.order.total,
          orderID: this.order.id,
          paymentMethodID: 2,
          transactionStatus: 'has been shipped',
        };

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log(this.transaction);

        // this._paymentService.addTransacrion(this.transaction).subscribe({
        //   next: (res) => {
        //     alert('Transaction Has been approved');
        //   },
        //   error: (err) => {
        //     alert('Transaction Has not been approved Please Try again later');
        //   },
        // });
      },
      error: (err) => {
        console.log(err);

        alert('there is issus in payment creation Please try agin later');
      },
    });
  }
  cancel() {
    this.router.navigate(['/home']);
  }
}
