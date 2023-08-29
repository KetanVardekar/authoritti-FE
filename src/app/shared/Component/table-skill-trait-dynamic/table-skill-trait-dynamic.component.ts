import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-skill-trait-dynamic',
  templateUrl: './table-skill-trait-dynamic.component.html',
  styleUrls: ['./table-skill-trait-dynamic.component.css']
})
export class TableSkillTraitDynamicComponent implements OnInit {
  @Input() allPagesData: any = [];
  @Input() currentIndex: any = null;
  @Input() activePageData: any = null;
  tableSkillData: any;
  tableSkillTraitData: any;
  finalSkillsList: any = [];
  finalTraitsList: any = [];

  constructor() { }

  ngOnInit(): void {

    //Table Skill Data
    let previousPage = this.allPagesData[this.currentIndex - 2];
    this.tableSkillData = previousPage.dynamic_question.template.template.tableSkill.finalAnswer;
    let array: any = [];
    if (this.tableSkillData && this.tableSkillData.length) {
      this.tableSkillData.forEach((element: any) => {
        element['checked'] = false;

        if (this.activePageData.template.template.tableSkillTrait['skillsFinalAnswer'] && this.activePageData.template.template.tableSkillTrait['skillsFinalAnswer'].length) {
          let exist = this.activePageData.template.template.tableSkillTrait['skillsFinalAnswer'].find((v: any) => v.skillName == element.skillName);
          if (exist) {
            element['checked'] = true;
            this.finalSkillsList.push(element);
          }
        }

        // array.push(element);

      });


      this.activePageData.template.template.tableSkillTrait['skillsFinalAnswer'] = this.finalSkillsList;
    }

    // this.tableSkillData = [...array];

    //Table Trait Data

    let previousPageForTrait = this.allPagesData[this.currentIndex - 1];

    this.tableSkillTraitData = previousPageForTrait.dynamic_question.template.template.tableTrait.finalAnswer;
    array = [];
    if (this.tableSkillTraitData && this.tableSkillTraitData.length) {
      this.tableSkillTraitData.forEach((element: any) => {
        element['checked'] = false;

        if (this.activePageData.template.template.tableSkillTrait['traitsFinalAnswer'] && this.activePageData.template.template.tableSkillTrait['traitsFinalAnswer'].length) {
          let exist = this.activePageData.template.template.tableSkillTrait['traitsFinalAnswer'].find((v: any) => v.skillName == element.skillName);
          if (exist) {
            element['checked'] = true;
            this.finalTraitsList.push(element);
          }
        }

        // array.push(element);
      });

      this.activePageData.template.template.tableSkillTrait['traitsFinalAnswer'] = this.finalTraitsList;
    }

    // this.tableSkillTraitData = [...array];
  }
  topTenSkill(event: any, data: any, index: any) {

    if (event.target.checked) {
      this.finalSkillsList.push(data)
    } else {
      this.finalSkillsList.splice(index, 1)
    }

    this.activePageData.template.template.tableSkillTrait['skillsFinalAnswer'] = this.finalSkillsList;
  }
  topTenTraits(event: any, data: any, index: any) {
    if (event.target.checked) {
      this.finalTraitsList.push(data)
    } else {
      this.finalTraitsList.splice(index, 1)
    }

    this.activePageData.template.template.tableSkillTrait['traitsFinalAnswer'] = this.finalTraitsList;

  }
}
