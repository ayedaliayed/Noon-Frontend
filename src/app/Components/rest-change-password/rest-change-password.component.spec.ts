import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestChangePasswordComponent } from './rest-change-password.component';

describe('RestChangePasswordComponent', () => {
  let component: RestChangePasswordComponent;
  let fixture: ComponentFixture<RestChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestChangePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
