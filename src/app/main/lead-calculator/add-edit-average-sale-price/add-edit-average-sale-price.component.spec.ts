import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAverageSalePriceComponent } from './add-edit-average-sale-price.component';

describe('AddEditAverageSalePriceComponent', () => {
  let component: AddEditAverageSalePriceComponent;
  let fixture: ComponentFixture<AddEditAverageSalePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAverageSalePriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAverageSalePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
