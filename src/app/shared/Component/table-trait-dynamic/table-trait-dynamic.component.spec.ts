import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTraitDynamicComponent } from './table-trait-dynamic.component';

describe('TableTraitDynamicComponent', () => {
  let component: TableTraitDynamicComponent;
  let fixture: ComponentFixture<TableTraitDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTraitDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTraitDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
