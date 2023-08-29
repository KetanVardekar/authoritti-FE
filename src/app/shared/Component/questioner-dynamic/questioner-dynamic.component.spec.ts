import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionerDynamicComponent } from './questioner-dynamic.component';

describe('QuestionerDynamicComponent', () => {
  let component: QuestionerDynamicComponent;
  let fixture: ComponentFixture<QuestionerDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionerDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionerDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
