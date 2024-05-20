import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Interfaces/iproduct';


@Injectable({
  providedIn: 'root'
})
export class ApiproductService {

  constructor(private _HttpClient :HttpClient ) { }

  getProductById(id:number):Observable<any>{
    return this._HttpClient.get<any>(`http://localhost:5114/api/Product/DetailsProduct/${id}`,)
  }
}
