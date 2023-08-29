import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditPageComponent } from './view-edit-page.component';

describe('ViewEditPageComponent', () => {
  let component: ViewEditPageComponent;
  let fixture: ComponentFixture<ViewEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
