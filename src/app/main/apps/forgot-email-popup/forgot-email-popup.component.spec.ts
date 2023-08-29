import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotEmailPopupComponent } from './forgot-email-popup.component';

describe('ForgotEmailPopupComponent', () => {
  let component: ForgotEmailPopupComponent;
  let fixture: ComponentFixture<ForgotEmailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotEmailPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotEmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
