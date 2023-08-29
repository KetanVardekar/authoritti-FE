import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStepComponent } from './add-edit-step.component';

describe('AddEditStepComponent', () => {
  let component: AddEditStepComponent;
  let fixture: ComponentFixture<AddEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
