import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditQuestionerDynamicComponent } from './view-edit-questioner-dynamic.component';

describe('ViewEditQuestionerDynamicComponent', () => {
  let component: ViewEditQuestionerDynamicComponent;
  let fixture: ComponentFixture<ViewEditQuestionerDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditQuestionerDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditQuestionerDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
