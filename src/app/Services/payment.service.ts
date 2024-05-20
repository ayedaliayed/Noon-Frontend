import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../Interfaces/Payment/payment';
import { Observable } from 'rxjs';
import { Transaction } from '../Interfaces/Payment/transaction';
import { IOrder } from '../Interfaces/Order/iorder';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 
  constructor(private _httpClient:HttpClient) { }

  
  addPaymentMethod(newPayment:Payment):Observable<any>
  {
    console.log(newPayment);
    
    return this._httpClient.post<any>("http://localhost:5114/api/Payment",newPayment)
  
  }
  
  
  
  addTransacrion(transaction:Transaction):Observable<any>
  {
    return this._httpClient.post<any>("http://localhost:5114/api/Transaction",transaction)
  }
}
