import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgoisticTypeComponent } from './egoistic-type.component';

describe('EgoisticTypeComponent', () => {
  let component: EgoisticTypeComponent;
  let fixture: ComponentFixture<EgoisticTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgoisticTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgoisticTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
