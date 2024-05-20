import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {

  constructor(private _httpClient: HttpClient) {}

  getProductBrands(id:number): Observable<any> {
    console.log(id);
    return this._httpClient.get<any>(`http://localhost:5114/api/ProductBrand?id=${id}`);
  }
}
