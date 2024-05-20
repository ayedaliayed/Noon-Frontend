import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { IAuth } from '../../Interfaces/Auth/iauth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: IAuth = {} as IAuth;
  isEdit: boolean = false;
  idUser: string | any;
  constructor(
    private _AuthService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) {}
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  translate = inject(TranslateService);
  closePopup(): void {
    this.dialogRef.close();
  }
  Register() {
    this._AuthService.register(this.user).subscribe({
      next: (res) => {
        console.log(res.user.id);
        this._AuthService.saveToken(res.token);
        localStorage.setItem('appUserId', res.user.id);
        this.dialogRef.close();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.log(this.user);
        console.log(err);
      },
    });
  }
}
