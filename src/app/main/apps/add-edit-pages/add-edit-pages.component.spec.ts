import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPagesComponent } from './add-edit-pages.component';

describe('AddEditPagesComponent', () => {
  let component: AddEditPagesComponent;
  let fixture: ComponentFixture<AddEditPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
