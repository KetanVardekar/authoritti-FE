import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitTypeComponent } from './trait-type.component';

describe('TraitTypeComponent', () => {
  let component: TraitTypeComponent;
  let fixture: ComponentFixture<TraitTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraitTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
