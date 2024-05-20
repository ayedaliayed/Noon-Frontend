// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-more-less',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './more-less.component.html',
//   styleUrl: './more-less.component.css'
// })
// export class MoreLessComponent implements OnInit{

//   @Input() text : string  ='';
//   @Input() wordlimit : number = 0 ;
//   ShowMore : boolean ;

//   constructor(){
//     this.ShowMore = false ;
//   }
//   ngOnInit(): void {

//   }

// }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-more-less',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './more-less.component.html',
  styleUrl: './more-less.component.css',
})
export class MoreLessComponent implements OnInit {
  @Input() text: string = '';
  @Input() wordlimit: number = 0;
  ShowMore: boolean;

  constructor() {
    this.ShowMore = false;
  }
  ngOnInit(): void {}
  translate = inject(TranslateService);
}
