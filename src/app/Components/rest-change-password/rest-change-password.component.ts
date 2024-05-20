import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAuth } from '../../Interfaces/Auth/iauth';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rest-change-password.component.html',
  styleUrl: './rest-change-password.component.css',
})
export class RestChangePasswordComponent {
  user: IAuth = {} as IAuth;
  constructor(private _AuthService: AuthService, private router: Router) {}
  restChangePassword() {
    this._AuthService.restChangePassword(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(this.user);
        console.log(err);
      },
    });
  }
}
