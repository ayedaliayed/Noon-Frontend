import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.ApiUrl;
  private totalFavSubject = new BehaviorSubject<number>(0);
  totalFav$ = this.totalFavSubject.asObservable();
  constructor(private http:HttpClient) { }


  addFavorite(userId: string, productId: number): Observable<any> {
    let requestBody = { userId, productId };
    return this.http.post<any>(`${this.apiUrl}/api/favorite`, requestBody);
  }

  getFavoritesByUserId(userId: string): Observable<any> {
 
    return this.http.get<any>(`${this.apiUrl}/api/Favorite/${userId}`);
  }
  deleteFavorite(userId: string, productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/Favorite/${userId}/${productId}`);
  }
  updatetotalFav(totalFav: number) {
    this.totalFavSubject.next(totalFav);
  }

}
