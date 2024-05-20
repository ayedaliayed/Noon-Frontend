import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { IAuth } from '../../Interfaces/Auth/iauth';
import { environment } from '../../../environments/environment.development';
import { SharedService } from '../shared.service';
// import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isloggedinBehavior: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isLoggedIn());
  private apiUrl = environment.ApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private _HttpClient: HttpClient,
    private shareService: SharedService,
    // private jwtHelperService:JwtHelperService
  ) {}

  // getUserIdFromToken(): string | null {
  //   let token = this.getToken();
  //   if (token) {
  //     let decodedToken = this.jwtHelperService.decodeToken(token);
  //     return decodedToken.id;
  //   }
  //   return null;
  // }

  
  sendDataToOtherComponent() {
    const dataToSend = {};
    this.shareService.sendData(dataToSend);
  }

  register(User: IAuth): Observable<IAuth> {
    this.isloggedinBehavior.next(true);
    return this._HttpClient.post<IAuth>(
      `${this.apiUrl}/api/Account/register`,
      JSON.stringify(User),
      this.httpOptions
    );
  }

  restPassword(email: string): Observable<IAuth> {
    console.log(email);
    return this._HttpClient.post<IAuth>(
      `${this.apiUrl}/api/Account/RestPassword`,

      { email: email },
      this.httpOptions
    );
  }

  restChangePassword(user: IAuth): Observable<IAuth> {
    return this._HttpClient.post<IAuth>(
      `${this.apiUrl}/api/Account/RestChangePassword`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  changePassword(
    email: string,
    password: string,
    oldPassword: string
  ): Observable<IAuth> {
    var data = {
      email: email,
      password: password,
      oldPassword: oldPassword,
    };
    return this._HttpClient.post<IAuth>(
      `${this.apiUrl}/api/Account/ChangePassword`,

      data,
      this.httpOptions
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Login(User: IAuth): Observable<IAuth> {
  //   console.log(JSON.stringify(User));
  //   this.isloggedinBehavior.next(true);
  //   return this._HttpClient.post<IAuth>(
  //     `${this.apiUrl}/api/Account/login`,
  //     JSON.stringify(User),
  //     this.httpOptions
  //   );
  // }


  Login(User: IAuth): Observable<IAuth> {
    console.log(JSON.stringify(User));
    
    // Send the login request
    return this._HttpClient.post<IAuth>(
      `${this.apiUrl}/api/Account/login`,
      JSON.stringify(User),
      this.httpOptions
    ).pipe(
      switchMap((response: IAuth) => {
        // If login request is successful, set isLoggedIn to true
        this.isloggedinBehavior.next(true);
        // Return the response
        return of(response);
      }),
      tap({
        // Handle any errors
        error: error => {
          // Log the error or handle it as needed
          console.error('Login error:', error);
          // Since login failed, set isLoggedIn to false
          this.isloggedinBehavior.next(false);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isloggedinBehavior.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getisloggedinBehaviorStaus() {
    return this.isloggedinBehavior;
  }
}
