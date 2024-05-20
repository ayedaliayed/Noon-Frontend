import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslationService } from '../../Services/trans/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  email: string = '' as string;
  password: string = '' as string;
  oldPassword: string = '' as string;
  languageChangeSubscription: Subscription | undefined;
  language: string = 'ar';
  translate = inject(TranslationService);

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _TranslationService: TranslationService
  ) {
    this.language = this._TranslationService.getDefaultLang()?.[0] || 'ar';
    this.languageChangeSubscription =
      this._TranslationService.translateService.onLangChange.subscribe(
        (event: any) => {
          this.language = event.lang || 'ar';
        }
      );
  }

  changePassword(email: string, password: string, oldPassword: string) {
    this._AuthService.changePassword(email, password, oldPassword).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(email);
        console.log(err);
      },
    });
  }
}
