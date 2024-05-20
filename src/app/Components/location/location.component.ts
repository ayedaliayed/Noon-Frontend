// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
// import { GoogleMap } from '@angular/google-maps';
// import { CommonModule } from '@angular/common';
// import { MatDialogRef } from '@angular/material/dialog';
// import { Iuser } from '../../Interfaces/iuser';
// import { UserService } from '../../Services/user.service';

// @Component({
//   selector: 'app-location',
//   standalone: true,
//   imports: [GoogleMap, FormsModule, CommonModule],
//   templateUrl: './location.component.html',
//   styleUrl: './location.component.css',
// })
// export class LocationComponent implements OnInit {
//   showMap: boolean = false;
//   userForm: FormGroup | null | undefined;
//   userData: Iuser | null = null;
//   email: string | '' = '';
//   fName: string | '' = '';
//   lName: string | '' = '';
//   phone: string | '' = '';
//   gender: string | '' = '';
//   national: string | '' = '';
//   userName: string | '' = '';

//   constructor(public dialogRef: MatDialogRef<LocationComponent> , private fb: FormBuilder, private userService: UserService) {
//     this.userForm = null;
//     this.userData = null;
//   }

//   closePopup(): void {
//     this.dialogRef.close();
//   }

//   locationName: string = '';

//   ngOnInit(): void {

//     this.userService.getUserData().subscribe({
//       next: (res: any) => {
//        this.userData = res;
//         console.log(this.userData);
//       },
//       error: (err) => {
//         console.error('Error fetching user data:', err);
//       },
//     });
//   }

//   display: any;
//   center: google.maps.LatLngLiteral = {
//     lat: 22.2736308,
//     lng: 70.7512555,
//   };
//   zoom = 6;

//   toggleView(): void {
//     this.showMap = !this.showMap;
//   }

//   moveMap(event: google.maps.MapMouseEvent) {
//     if (event.latLng != null) this.center = event.latLng.toJSON();
//     if (event.latLng != null) {
//     }
//   }

//   move(event: google.maps.MapMouseEvent) {
//     if (event.latLng != null) this.display = event.latLng.toJSON();
//     if (event.latLng != null) {
//     }
//   }

//   getLocationName(coordinates: google.maps.LatLngLiteral) {
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ location: coordinates }, (results, status) => {
//       console.log(results);
//       if (status === 'OK') {
//         if (results && results.length > 0) {
//           this.locationName = results[0].formatted_address;
//         } else {
//           this.locationName = 'Location name not found';
//         }
//       } else {
//         this.locationName = 'Geocoder failed due to: ' + status;
//       }
//     });
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Iuser } from '../../Interfaces/iuser';
import { UserService } from '../../Services/user.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../Services/trans/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [GoogleMap, FormsModule, CommonModule, TranslateModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  showMap: boolean = false;
  userForm: FormGroup | null | undefined;
  userData: Iuser | null = null;
  email: string | '' = '';
  fName: string | '' = '';
  lName: string | '' = '';
  phone: string | '' = '';
  gender: string | '' = '';
  national: string | '' = '';
  userName: string | '' = '';
  languageChangeSubscription: Subscription | undefined;
  language: string = 'ar';
  translate = inject(TranslationService);

  constructor(
    public dialogRef: MatDialogRef<LocationComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private _TranslationService: TranslationService
  ) {
    this.userForm = null;
    this.userData = null;
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  locationName: string = '';

  ngOnInit(): void {
    this.language = this._TranslationService.getDefaultLang()?.[0] || 'ar';
    this.languageChangeSubscription =
      this._TranslationService.translateService.onLangChange.subscribe(
        (event: any) => {
          this.language = event.lang || 'ar';
        }
      );

    this.userService.getUserData().subscribe({
      next: (res: any) => {
        this.userData = res;
        console.log(this.userData);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555,
  };
  zoom = 6;

  toggleView(): void {
    this.showMap = !this.showMap;
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
    if (event.latLng != null) {
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
    if (event.latLng != null) {
    }
  }

  getLocationName(coordinates: google.maps.LatLngLiteral) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: coordinates }, (results, status) => {
      console.log(results);
      if (status === 'OK') {
        if (results && results.length > 0) {
          this.locationName = results[0].formatted_address;
        } else {
          this.locationName = 'Location name not found';
        }
      } else {
        this.locationName = 'Geocoder failed due to: ' + status;
      }
    });
  }
}
