import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSkillDynamicComponent } from './table-skill-dynamic.component';

describe('TableSkillDynamicComponent', () => {
  let component: TableSkillDynamicComponent;
  let fixture: ComponentFixture<TableSkillDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSkillDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSkillDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
