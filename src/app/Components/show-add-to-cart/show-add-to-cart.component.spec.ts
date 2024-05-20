import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAddToCartComponent } from './show-add-to-cart.component';

describe('ShowAddToCartComponent', () => {
  let component: ShowAddToCartComponent;
  let fixture: ComponentFixture<ShowAddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAddToCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
