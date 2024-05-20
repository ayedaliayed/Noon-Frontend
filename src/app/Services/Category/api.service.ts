import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../Interfaces/Category/icategory';
import { environment } from '../../../environments/environment.development';
import { IProduct } from '../../Interfaces/Category/iproduct';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl=environment.ApiUrl;
  constructor(private _http:HttpClient) { }

  getCategories():Observable<ICategory[]> {
    // return this._http.get<ICategory[]>('http://localhost:5114/api/Category');
    return this._http.get<ICategory[]>(this.apiUrl+'/api/Category');
  }

  getCategoryId(catId:number):Observable<any>
  {
    return this._http.get<any>(`${this.apiUrl}/api/Category/GetAllProductsByCategory/${catId}`);
  }
}
