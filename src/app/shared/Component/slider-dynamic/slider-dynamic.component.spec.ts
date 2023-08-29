import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDynamicComponent } from './slider-dynamic.component';

describe('SliderDynamicComponent', () => {
  let component: SliderDynamicComponent;
  let fixture: ComponentFixture<SliderDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
