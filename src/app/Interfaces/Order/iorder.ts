import { IAppUser } from "./iapp-user";
import { IOrderItem } from "./iorder-item";

export interface IOrder {
    cartId:number;
    id: number;
    appUserId: string;
    appUser: IAppUser;
    orderDate: string;
    status: string;
    deliveryMethodId: number;
    deliveryMethod: string;
    deliveryMethodCost: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    transactions :string[]
}
