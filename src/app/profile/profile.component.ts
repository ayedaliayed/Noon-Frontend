import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Iuser } from '../Interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup | null;
  userData: Iuser | null = null;
  email: string | '' = '';
  fName: string | '' = '';
  lName: string | '' = '';
  phone: string | '' = '';
  birthDate: string | '' = '';
  gender: string | '' = '';
  national: string | '' = '';
  userName: string | '' = '';
  id: string | '' = '';
  code: number | '' = '';
  city: string | '' = '';
  country: string | '' = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = null;
    this.userData = null;
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (res: any) => {
        this.email = res.email;
        this.fName = res.fName;
        this.lName = res.lName;
        this.phone = res.phone;
        this.birthDate = res.birthDate;
        this.id = res.id;
        this.userName = res.userName;
        this.gender = res.gender;
        this.national = res.national;
        this.city = res.city;
        this.country = res.country;
        
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  updateUserData(
    email: string,
    birthDate: string,
    fName: string,
    lName: string,
    national: string,
    gender: string,
    phone: string,
    id: string,
    userName: string,
    city: string,
    country: string
  ): void {
    const user = {
      email: email,
      birthDate: birthDate,
      fName: fName,
      lName: lName,
      national: national,
      gender: gender,
      phone: phone,
      id: id,
      userName: userName,
      country: country,
      city: city,
    };
    this.userService.updateUserData(user).subscribe({
      next: (res) => {
        this.userData = res;
        this.userData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
