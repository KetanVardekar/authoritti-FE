import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAverageSaleRequiredComponent } from './add-edit-average-sale-required.component';

describe('AddEditAverageSaleRequiredComponent', () => {
  let component: AddEditAverageSaleRequiredComponent;
  let fixture: ComponentFixture<AddEditAverageSaleRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAverageSaleRequiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAverageSaleRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
