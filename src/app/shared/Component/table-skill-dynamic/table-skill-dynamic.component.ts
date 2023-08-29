import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-skill-dynamic',
  templateUrl: './table-skill-dynamic.component.html',
  styleUrls: ['./table-skill-dynamic.component.css']
})
export class TableSkillDynamicComponent implements OnInit {
  @Input() allPagesData: any = [];
  @Input() currentIndex: any = null;
  @Input() activePageData: any = null;
  skillsValue: any;
  tableSkillData: any;
  skillData: any = [];
  totalScoreofProfession: any = {};
  totalCountofProfession: any = {};
  titleLengthofProfession: any = {};
  totalScoreofPassion: any = {};
  totalCountofPassion: any = {};
  titleLengthofPassion: any = {};
  passionFilteredData: any = []
  professionFilteredData: any = [];


  constructor() { }

  ngOnInit(): void {
    this.tableSkillData = this.activePageData?.template?.template?.tableSkill;

    let indexofProfession = null;
    let indexofPassion = null;

    indexofProfession = this.allPagesData.findIndex((ele: any) => ele?.custom_template?.name === 'profession');
    indexofPassion = this.allPagesData.findIndex((ele: any) => ele?.custom_template?.name === 'passion');

    this.allPagesData.find((ele: any) => {
      // ------------------------------Profession Questions Sorting-------------
      if (ele?.custom_template?.finalAnswer?.length && ele?.custom_template?.name === 'profession') {
        indexofProfession = this.allPagesData.findIndex((ele: any) => ele?.custom_template?.name === 'profession')
        this.professionFilteredData = [];
        for (let i = indexofProfession + 1; i <= this.allPagesData.length; i++) {
          if (this.allPagesData[i] !== undefined) {
            if (this.allPagesData[i].questioner?.tag == "tableSkill") {
              this.professionFilteredData.push(this.allPagesData[i])
            } else if (this.allPagesData[i].dynamic_question || this.allPagesData[i].intro || this.allPagesData[i].section || this.allPagesData[i].report || this.allPagesData[i].custom_template) {
              break;
            }
          }
        }
        // ----------------------Passion Questions Sorting-----------
      } else if (ele?.custom_template?.finalAnswer?.length && ele?.custom_template?.name === 'passion') {
        indexofPassion = this.allPagesData.findIndex((ele: any) => ele?.custom_template?.name === 'passion')
        this.passionFilteredData = [];
        for (let i = indexofPassion + 1; i <= this.allPagesData.length; i++) {
          if (this.allPagesData[i] !== undefined) {
            if (this.allPagesData[i].questioner?.tag == "tableSkill") {
              this.passionFilteredData.push(this.allPagesData[i])
            } else if (this.allPagesData[i].dynamic_question || this.allPagesData[i].intro || this.allPagesData[i].section || this.allPagesData[i].report || this.allPagesData[i].custom_template) {
              break;
            }
          }
        }

      }
    })



    // --------------For calculation of Profession Template-----
    if (this.professionFilteredData && this.professionFilteredData.length && (this.nearValue(indexofProfession,indexofPassion,this.currentIndex) == indexofProfession)) {
      let allQuestionsOfSkill: any = []
      this.professionFilteredData.filter((ele: any) => {
        if (ele?.questioner?.questions) {

          ele?.questioner?.questions.filter((res: any) => {
            if (res?.id?.question?.slider) {
              if (res?.id?.question?.slider?.finalAnswer?.value >= 1) {
                allQuestionsOfSkill.push({ 'title': res?.id?.question?.slider?.title, 'score': res?.id?.question?.slider?.finalAnswer?.value })
              }
            }
          })
        }

      })

      allQuestionsOfSkill.forEach((ele: any) => {
        if (this.totalScoreofProfession[ele.title]) {
          this.totalScoreofProfession[ele.title] = this.totalScoreofProfession[ele.title] + ele.score;
          this.titleLengthofProfession[ele.title]++;
        } else {
          this.totalScoreofProfession[ele.title] = ele.score;
          this.titleLengthofProfession[ele.title] = 1;
        }
      })

      let obj: any = {};
      for (let score in this.totalScoreofProfession) {
        let temp = {};
        let element = this.totalScoreofProfession[score]

        for (let length in this.titleLengthofProfession) {
          obj[score] = (element / this.titleLengthofProfession[length]).toFixed(2);
          temp = {
            score: obj[score]
          }
        }

        obj[score] = temp;
      }

      this.skillsValue = obj

    }
    // --------------For calculation of Passion Template-----
    if (this.passionFilteredData && this.passionFilteredData.length && (this.nearValue(indexofProfession,indexofPassion,this.currentIndex) == indexofPassion)) {
      let allQuestionsOfSkill: any = []
      this.passionFilteredData.filter((ele: any) => {
        if (ele?.questioner?.questions) {

          ele?.questioner?.questions.filter((res: any) => {
            if (res?.id?.question?.slider) {
              if (res?.id?.question?.slider?.finalAnswer?.value >= 1) {
                allQuestionsOfSkill.push({ 'title': res?.id?.question?.slider?.title, 'score': res?.id?.question?.slider?.finalAnswer?.value })
              }
            }
          })
        }

      })

      allQuestionsOfSkill.forEach((ele: any) => {
        if (this.totalScoreofPassion[ele.title]) {
          this.totalScoreofPassion[ele.title] = this.totalScoreofPassion[ele.title] + ele.score;
          this.titleLengthofPassion[ele.title]++;
        } else {
          this.totalScoreofPassion[ele.title] = ele.score;
          this.titleLengthofPassion[ele.title] = 1;
        }
      })

      let obj: any = {}
      for (let score in this.totalScoreofPassion) {
        let temp = {};
        let element = this.totalScoreofPassion[score]

        for (let length in this.titleLengthofPassion) {
          obj[score] = (element / this.titleLengthofPassion[length]).toFixed(2);
          temp = {
            score: obj[score]
          }
        }

        obj[score] = temp;
      }
      this.skillsValue = obj

    }

    this.skillData = [];
    if (this.activePageData.template.template.tableSkill['finalAnswer'] && this.activePageData.template.template.tableSkill['finalAnswer'].length) {

      this.activePageData.template.template.tableSkill['finalAnswer'].forEach((element: any) => {

        if (this.skillsValue && this.skillsValue[element.skillName]) {
          let obj = {
            score: this.skillsValue[element.skillName].score,
            colName: element.colName
          };

          this.skillsValue[element.skillName] = obj;
          this.skillData.push(element);
        }
      });

      this.activePageData.template.template.tableSkill['finalAnswer'] = this.skillData;

    } else {



    }
  }


  nearValue(low:any,high:any,current:any){

    if(low < current && current < high){
      return low;
    }

    if(high < current && current > low){
      return high;
    }
  }

  colFour(event: any, data: any, skills: any, avgScore: any) {
    if (event.target.checked) {

      if (this.skillData && this.skillData.length) {
        let exist = this.skillData.findIndex((v: any) => v.skillName == skills);
        if (exist > -1) {
          this.skillData[exist] = { 'skillName': skills, 'avgScore': avgScore, 'colName': data }
        } else {
          this.skillData.push({ 'skillName': skills, 'avgScore': avgScore, 'colName': data })
        }
      } else {
        this.skillData = [];
        this.skillData.push({ 'skillName': skills, 'avgScore': avgScore, 'colName': data })
      }


    }

    this.activePageData.template.template.tableSkill['finalAnswer'] = this.skillData
  }
  colFive(event: any, data: any, skills: any, avgScore: any) {
    if (event.target.checked) {
      if (this.skillData && this.skillData.length) {
        let exist = this.skillData.findIndex((v: any) => v.skillName == skills);
        if (exist > -1) {
          this.skillData[exist] = { 'skillName': skills, 'avgScore': avgScore, 'colName': data }
        } else {
          this.skillData.push({ 'skillName': skills, 'avgScore': avgScore, 'colName': data })
        }
      } else {
        this.skillData = [];
        this.skillData.push({ 'skillName': skills, 'avgScore': avgScore, 'colName': data })
      }

    }

    this.activePageData.template.template.tableSkill['finalAnswer'] = this.skillData
  }
}
