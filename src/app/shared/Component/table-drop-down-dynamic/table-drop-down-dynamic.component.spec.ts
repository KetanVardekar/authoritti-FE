import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDropDownDynamicComponent } from './table-drop-down-dynamic.component';

describe('TableDropDownDynamicComponent', () => {
  let component: TableDropDownDynamicComponent;
  let fixture: ComponentFixture<TableDropDownDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDropDownDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDropDownDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
