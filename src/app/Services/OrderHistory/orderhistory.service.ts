import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../../Interfaces/Order/iorder';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class OrderhistoryService {
  constructor(private _httpClient: HttpClient) {}

  getAllOrders() {
    const url = 'http://localhost:5114/api/Order/user';

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this._httpClient.get<any>(url, { headers: headers });
  }
}
