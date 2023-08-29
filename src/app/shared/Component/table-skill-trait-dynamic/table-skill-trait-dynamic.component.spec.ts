import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSkillTraitDynamicComponent } from './table-skill-trait-dynamic.component';

describe('TableSkillTraitDynamicComponent', () => {
  let component: TableSkillTraitDynamicComponent;
  let fixture: ComponentFixture<TableSkillTraitDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSkillTraitDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSkillTraitDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
