import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcTypeComponent } from './arc-type.component';

describe('ArcTypeComponent', () => {
  let component: ArcTypeComponent;
  let fixture: ComponentFixture<ArcTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
