import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private _httpClient: HttpClient) {}

  getAllProduct(page: number): Observable<any> {
    return this._httpClient.get<any>(
      `http://localhost:5114/api/Product?page=${page}`
    );
  }

  getAllFilteredProduct(page: number, category: string): Observable<any> {
    return this._httpClient.get<any>(
      `http://localhost:5114/api/Product?page=${page}&category=${category}`
    );
  }

  getProductByID(id: number): Observable<any> {
    return this._httpClient.get<any>(
      `http://localhost:5114/api/Product/DetailsProduct/${id}`
    );
  }

  search(page: number, searchTerm: string): Observable<any> {
    return this._httpClient.get<any>(
      `http://localhost:5114/api/Product?searchTerm=${searchTerm}&page=${page}`
    );
  }
  getBrands(): Observable<any> {
    return this._httpClient.get<any>(`http://localhost:5114/api/Brand`);
  }
  filterBrandPrice(
    page: number,
    maxPrice: number,
    minPrice: number,
    brandName: string
  ): Observable<any> {
    return this._httpClient.get<any>(
      `http://localhost:5114/api/Product?maxPrice=${maxPrice}&minPrice=${minPrice}&page=${page}&brandName=${brandName}`
    );
  }
}
