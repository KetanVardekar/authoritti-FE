import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionerDynamicComponent } from './add-edit-questioner-dynamic.component';

describe('AddEditQuestionerDynamicComponent', () => {
  let component: AddEditQuestionerDynamicComponent;
  let fixture: ComponentFixture<AddEditQuestionerDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditQuestionerDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQuestionerDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
