// import { Iproduct } from './iproduct';

// export interface Item {
//   cartItemId: number;
//   cartItems: cartItems[];
//   cartId: number;
//   productId: number;
//   productName: 'string';
//   productPrice: number;
//   quantity: number;
//   totalAmount: number;
//   product: IproductCart;
// }

// interface cartItems {
//   productId: number;
//   productName: 'string';
//   productPrice: number;
//   quantity: number;
//   cartItemId: number;
//   product: IproductCart;
// }
//  interface IproductCart {
//   id:number,
//   title:string,
//   description:string,
//   price:number,
//   images:string[]

// }

import { Iproduct } from './iproduct';

export interface Item {
  cartItemId: number;
  cartItems: cartItems[];
  cartId: number;
  productId: number;
  productName: 'string';
  productPrice: number;
  quantity: number;
  totalAmount: number;
  product: IproductCart;
}

interface cartItems {
  productId: number;
  productName: 'string';
  productPrice: number;
  quantity: number;
  cartItemId: number;
  product: IproductCart;
}
interface IproductCart {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
}
