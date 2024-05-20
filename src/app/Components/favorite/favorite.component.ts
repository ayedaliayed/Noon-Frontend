import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteService } from '../../Services/Favo/favorite.service';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent implements OnInit {
  favorites: any[] = [];
  productId: number = 0;
  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getAllFavorites();
  }

  addToCart(GetPrdId: number) {
    this.cartService.createCart().subscribe({
      next: (res) => {
        console.log(res.cartId);
        console.log(GetPrdId);
        this.cartService.addtoCart(GetPrdId, res.cartId, 1).subscribe({
          next: (tr) => {
            console.log(tr);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFavorite(productId: number) {
    let userId = localStorage.getItem('appUserId');
    if (!userId) {
      console.error('userId');
      return;
    }
    this.productId = productId;

    this.favoriteService.deleteFavorite(userId, this.productId).subscribe({
      next: (res) => {
        this.getAllFavorites();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllFavorites() {
    let userId = localStorage.getItem('appUserId');
    if (!userId) {
      console.error('userId');
      return;
    }
    this.favoriteService.getFavoritesByUserId(userId).subscribe({
      next: (res) => {
        this.favorites = res;
        console.log(this.favorites);
        this.favoriteService.updatetotalFav(this.favorites.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  trackById(index: number, product: any): any {
    return product.id;
  }
}
