import { IProduct } from "./iproduct";
import { ISubcategory } from "./isubcategory";

export interface ICategory {
    id: number;
    name: string;
    name_Ar :string
    isDeleted: boolean;
    // products: IProduct[];
    subcategories: ISubcategory[];
    showSubcategories:boolean;
    specifications?: any[];
}
