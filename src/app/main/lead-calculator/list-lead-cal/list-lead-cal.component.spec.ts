import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLeadCalComponent } from './list-lead-cal.component';

describe('ListLeadCalComponent', () => {
  let component: ListLeadCalComponent;
  let fixture: ComponentFixture<ListLeadCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLeadCalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLeadCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
