import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './Services/Auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from './Components/auth/auth.component';
export const authGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);
  if (userAuth.isLoggedIn()) {
    return true;
  } else {
    const dialogRef = dialog.open(AuthComponent, {
      width: '700px', // Set the width of the popup
      disableClose: true, // Prevent closing by clicking outside
      // You can pass any data to the popup component if needed
      // data: { someData: 'value' }
    });
    return false;
  }
};
