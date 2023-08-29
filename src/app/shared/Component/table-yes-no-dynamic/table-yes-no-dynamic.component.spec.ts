import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableYesNoDynamicComponent } from './table-yes-no-dynamic.component';

describe('TableYesNoDynamicComponent', () => {
  let component: TableYesNoDynamicComponent;
  let fixture: ComponentFixture<TableYesNoDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableYesNoDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableYesNoDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
