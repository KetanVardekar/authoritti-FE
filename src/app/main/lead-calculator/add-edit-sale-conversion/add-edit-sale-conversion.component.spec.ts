import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSaleConversionComponent } from './add-edit-sale-conversion.component';

describe('AddEditSaleConversionComponent', () => {
  let component: AddEditSaleConversionComponent;
  let fixture: ComponentFixture<AddEditSaleConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSaleConversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSaleConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
