import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Item } from '../Interfaces/item';
import { environment } from '../../environments/environment.development';
import { AuthService } from './Auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.ApiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  

  private item: Item[] = [];
  private _httpClient: any;
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();
  constructor(private _HttpClient: HttpClient, private _auth: AuthService) {}
  getAllProfucts(): Observable<any> {
    var appUserId = localStorage.getItem('appUserId');
    console.log(JSON.stringify(appUserId));
    return this._HttpClient.get(
      `${this.apiUrl}/api/Cart/GetCartByUserId?userId=${appUserId}`,
      this.httpOptions
    );
  }

  removeFromCart(item: Item): void {
    const index = this.item.indexOf(item);
    if (index !== -1) {
      this.item.splice(index, 1);
    }
  }
  createCart(): Observable<any> {
    const appUserId = localStorage.getItem('appUserId');
    const tk = localStorage.getItem('token');
    console.log(tk);

    return this._HttpClient
      .post(
        `${this.apiUrl}/api/Cart/createCart`,
        { appUserId: appUserId },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }),
        }
      )
      .pipe(
        switchMap(() => {
          // After the cart is created, make the GET request to fetch the cart details
          return this._HttpClient.get(
            `${this.apiUrl}/api/Cart/GetCartByUserId?userId=${appUserId}`,
            this.httpOptions
          );
        })
      );
  }
  addtoCart(productId: Number, cartId: number,currentNumber:number): Observable<any> {
    var appUserId = localStorage.getItem('appUserId');
    console.log(JSON.stringify(appUserId));
    return this._HttpClient.post(
      `${this.apiUrl}/api/Cart`,
      {
        productId: productId,
        cartId: cartId,
        quantity: currentNumber,
      },
      this.httpOptions
    );
  }

  getItems(): Observable<any> {
    var appUserId = localStorage.getItem('appUserId');
    console.log(JSON.stringify(appUserId));
    return this._HttpClient.get(
      `${this.apiUrl}/api/Cart/GetCartByUserId?userId=${appUserId}`,
      this.httpOptions
    );
  }

  DeleteFromCart(CartItemId: number): Observable<any> {
    return this._HttpClient.delete(
      'http://localhost:5114/api/CartItem/DeleteCartItem',
      { body: CartItemId }
    );
  }
  clearCart(): void {
    this.item = [];
  }

  getProductbyid(id: number): Observable<Item> {
    return this._httpClient.get(`http://localhost:5114/cart/${id}`);
  }

  updateTotalItems(totalItems: number) {
    this.totalItemsSubject.next(totalItems);
  }
}
