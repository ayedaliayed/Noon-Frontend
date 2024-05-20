import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutBrandComponent } from './prodcut-brand.component';

describe('ProdcutBrandComponent', () => {
  let component: ProdcutBrandComponent;
  let fixture: ComponentFixture<ProdcutBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdcutBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
