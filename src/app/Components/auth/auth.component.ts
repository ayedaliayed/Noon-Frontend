import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAuth } from '../../Interfaces/Auth/iauth';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslationService } from '../../Services/trans/translation.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  user: IAuth = {} as IAuth;
  isEdit: boolean = false;
  idUser: string | any;
  hidePassword: boolean = true;

  Error: string = '';
  Error2: string = '';

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  constructor(
    private _AuthService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<AuthComponent>,
    private _TranslationService: TranslationService
  ) {}

  translate = inject(TranslateService);
  language2: string = this.translate.langs.toString();
  closePopup(): void {
    this.dialogRef.close();
  }
  Login() {
    this._AuthService.Login(this.user).subscribe({
      next: (res) => {
        console.log(res.user.id);
        this._AuthService.saveToken(res.token);
        localStorage.setItem('appUserId', res.user.id);
        this.dialogRef.close();
        // this.router.navigate(['/products']);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          const errorMessage = err.error.message; // Access the custom error message
          if (errorMessage.includes("Admin Account can't be used for login")) {
            this.Error =
              "Invalid login attempt. Admin Account can't be used for login";
            this.Error2 =
              'محاولة تسجيل الدخول غير صالحة. لا يمكن استخدام حساب المسؤول لتسجيل الدخول';
          } else if (errorMessage.includes('Account is deactivated')) {
            this.Error = 'Invalid login attempt. Account is deactivated';
            this.Error2 = 'محاولة تسجيل الدخول غير صالحة. تم تعطيل الحساب';
          } else {
            this.Error = 'Access forbidden: ' + errorMessage;
          }
        } else {
          // Handle other errors
          console.error('An error occurred:', err);
        }
        console.log(this.user);
        console.log(err);
      },
    });
  }
}
