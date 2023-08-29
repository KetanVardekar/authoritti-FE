import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAnnualGoalComponent } from './add-edit-annual-goal.component';

describe('AddEditAnnualGoalComponent', () => {
  let component: AddEditAnnualGoalComponent;
  let fixture: ComponentFixture<AddEditAnnualGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAnnualGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAnnualGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
