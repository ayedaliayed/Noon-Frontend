import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getUserData(): Observable<any> {
    console.log(localStorage.getItem('token'));
    return this._httpClient.get<any>(
      `${this.apiUrl}/api/User`,
      this.httpOptions
    );
  }

  updateUserData(userData: any): Observable<any> {
    console.log(userData);
    return this._httpClient.put<any>(
      `${this.apiUrl}/api/User`,
      userData,
      this.httpOptions
    );
  }
}
