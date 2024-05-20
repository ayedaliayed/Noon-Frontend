import { Component, OnInit } from '@angular/core';
import { MoreLessComponent } from '../more-less/more-less.component';
import { DIProduct } from '../../Interfaces/diproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductServiceService } from '../../Services/ProductsSerivce/product-service.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { Item } from '../../Interfaces/item';

@Component({
  selector: 'app-show-add-to-cart',
  standalone: true,
  imports: [MoreLessComponent,RouterLink,CommonModule],
  templateUrl: './show-add-to-cart.component.html',
  styleUrl: './show-add-to-cart.component.css'
})
export class ShowAddToCartComponent implements OnInit{

  product : DIProduct|null=null; 
  item : Item |null = null;
  GetPrdId : number=0;
  url = 'http://localhost:5108/' 
  constructor(private _ActivatedRoute:ActivatedRoute ,private _ProductServiceService: ProductServiceService,private _CartService:CartService){}


  ngOnInit(): void {
    this.GetPrdId = Number (this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._ProductServiceService.getProductByID(this.GetPrdId).subscribe({
     next:(res)=>{
       this.product = res.entity ; 
       console.log("Product is ");
       console.log(this.product);
       

      //  console.log(res);       
       
       },
       error:(err)=>{
         console.log(err);
         
         
       }
    })   
  }
  


  // ngOnInit(): void {
  //   this.GetPrdId = Number (this._ActivatedRoute.snapshot.paramMap.get('id'));
  //   this._CartService.getProductbyid(this.GetPrdId).subscribe({
  //    next:(res)=>{
  //      this.item = res; 
  //      console.log("Product is ");
  //      console.log(this.item);
       

        
       
  //      },
  //      error:(err)=>{
  //        console.log(err);
         
         
  //      }
  //   })   
  // }

}
