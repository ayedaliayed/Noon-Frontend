import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../Interfaces/Order/iorder';
import { Token } from '@angular/compiler';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  private apiUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  makeOrderRequest(): Observable<IOrder> {
    var appUserId = localStorage.getItem('appUserId');
    return this._http.get<IOrder>(
      `${this.apiUrl}/api/Order/last`,
      this.httpOptions
    );
  }

  checkOrder(iorder: IOrder) {
    return this._http.post<IOrder>(
      this.apiUrl + `/api/Order`,
      JSON.stringify(iorder),
      this.httpOptions
    );
  }

  DeleteFromOrder(OrderId: number): Observable<any> {
    return this._http.delete(
      this.apiUrl + `/orderItem/` + OrderId,
      this.httpOptions
    );
  }
  getOrder(): Observable<any> {
    return this._http.get<any>(`http://localhost:5114/api/Order/user/`);
  }
}
