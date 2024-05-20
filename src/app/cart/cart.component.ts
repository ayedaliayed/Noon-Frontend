import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Item } from '../Interfaces/item';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiOrderService } from '../Services/Order/api-order.service';
import { IOrder } from '../Interfaces/Order/iorder';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Item = {} as Item;
  url = 'http://localhost:5108/';
  order: IOrder = {} as IOrder;

  qu: number[] = [];
  translate = inject(TranslateService);
  constructor(
    private _cartService: CartService,
    private router: Router,
    private _orderService: ApiOrderService
  ) {}
  
  RemoveFromCart(CartItemId: number) {
    this._cartService.DeleteFromCart(CartItemId).subscribe({
      next: (res) => {
        console.log(res)
        this._cartService.getItems().subscribe({
          next: (re) => {
            this.cart = re;
            console.log(re);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }
  getQuantityOptions(cartItem: any): number[] {
    this.qu = Array.from(
      { length: this.cart.product.quantity },
      (_, i) => i + 1
    );
    
    return cartItem.availableQuantities;
  }

  updateQuantity(cartItem: any) {}

  getQuantityList(quantity: number): number[] {
    return Array.from({ length: quantity }, (_, i) => i + 1);
  }
  ngOnInit(): void {
    console.log(this.cart);
    this._cartService.getItems().subscribe({
      next: (res) => {
        this.cart = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToCheckout(): void {
    console.log(this.cart.cartId, 'dsaaaaaaaaaaaaaaaaa');
    this.order.cartId = this.cart.cartId;
    this.order.deliveryMethodId = 1;
    this.order.transactions = ['checkout'];
    this._orderService.checkOrder(this.order).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/order']);
      },
      error: (err) => {
        console.log(err);
        // this.router.navigate(['/order']);
      },
    });
  }
}
