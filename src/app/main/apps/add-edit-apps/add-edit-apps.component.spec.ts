import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAppsComponent } from './add-edit-apps.component';

describe('AddEditAppsComponent', () => {
  let component: AddEditAppsComponent;
  let fixture: ComponentFixture<AddEditAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
