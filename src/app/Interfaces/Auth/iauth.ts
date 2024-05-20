export interface IAuth {
  token: string;
  user:User;
  city: string;
  country: string;
  phone: string;
  code: Number;
  postalCode: string;
  specialPlace: string;
  cart: string;
  deactivate: boolean;
  orders: [];
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  passwordHash: string;
  passwordHashConfirmed: boolean;
  password: string;
}



interface User{
  city: string;
  country: string;
  phone: string;
  code: Number;
  postalCode: string;
  specialPlace: string;
  cart: string;
  deactivate: boolean;
  orders: [];
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  passwordHash: string;
  passwordHashConfirmed: boolean;
  password: string;
}