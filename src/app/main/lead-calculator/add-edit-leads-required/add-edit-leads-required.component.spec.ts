import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeadsRequiredComponent } from './add-edit-leads-required.component';

describe('AddEditLeadsRequiredComponent', () => {
  let component: AddEditLeadsRequiredComponent;
  let fixture: ComponentFixture<AddEditLeadsRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLeadsRequiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLeadsRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
