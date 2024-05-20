import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-rest-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './rest-password.component.html',
  styleUrl: './rest-password.component.css',
})
export class RestPasswordComponent {
  email: string = '' as string;

  constructor(private _AuthService: AuthService, private router: Router) {}

  resetPassword(email: string) {
    console.log(email);
    this._AuthService.restPassword(email).subscribe({
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
