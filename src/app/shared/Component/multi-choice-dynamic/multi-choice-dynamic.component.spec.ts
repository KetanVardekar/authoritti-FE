import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceDynamicComponent } from './multi-choice-dynamic.component';

describe('MultiChoiceDynamicComponent', () => {
  let component: MultiChoiceDynamicComponent;
  let fixture: ComponentFixture<MultiChoiceDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiChoiceDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiChoiceDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
