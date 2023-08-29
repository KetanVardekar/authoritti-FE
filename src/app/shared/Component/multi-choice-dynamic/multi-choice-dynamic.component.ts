import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multi-choice-dynamic',
  templateUrl: './multi-choice-dynamic.component.html',
  styleUrls: ['./multi-choice-dynamic.component.css']
})
export class MultiChoiceDynamicComponent implements OnInit {
  multiChoiceData: any;
  id: any;
  deletedvalue: any
  multiChoiceAnswer: any = {};
  @Input() allPagesData: any = [];
  @Input() currentIndex: any = null;
  @Input() activePageData: any = null;
  @Input() viewMode: any = null;

  @Output() gotoPreviousPage = new EventEmitter();

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {

      if (params && params.id) {
        this.id = params.id;

      }
    })


    let previousPage = this.allPagesData[this.currentIndex - 1];
    let finalAnswers = this.activePageData.template.template.multipleChoice['finalAnswer'];
    this.multiChoiceData = previousPage.dynamic_question.template.template.tableDropDown.finalAnswer;


    // if (this.id) {
    //   this.activePageData.template.template.multipleChoice['finalAnswer'] = {}
    //   this.activePageData.template.template.multipleChoice['finalAnswer'] = this.multiChoiceData;
    //   // this.multiChoiceAnswer = this.multiChoiceData
    // }

    let keys = Object.keys(this.multiChoiceData);
    if (keys && keys.length) {
      keys.forEach(ele => {
        if (this.multiChoiceData[ele] && this.multiChoiceData[ele].length) {
          this.multiChoiceData[ele].forEach((element: any) => {
            element['checked'] = false;
            if (finalAnswers) {
              let finalAnswerKeys = Object.keys(finalAnswers);
              if (finalAnswerKeys.includes(ele)) {
                let arr = finalAnswers[ele];
                if (arr && arr.length) {
                  arr.forEach((val: any) => {
                    if (element.title == val.title) {
                      element['checked'] = true;
                    }
                  });
                }
              }
            }

          });
        }
      })
    }

    if (finalAnswers || this.id) {

      let obj: any = {};
      let keys = Object.keys(this.multiChoiceData);
      if (keys && keys.length) {
        keys.forEach(ele => {
          if (this.multiChoiceData[ele] && this.multiChoiceData[ele].length) {
            this.multiChoiceData[ele].forEach((element: any) => {

              if (element.checked) {
                if (obj[ele] && obj[ele].length) {
                  obj[ele].push(element);
                } else {
                  obj[ele] = [];
                  obj[ele].push(element);
                }
              }
            });
          }
        });
      }

      this.multiChoiceAnswer = JSON.parse(JSON.stringify(obj));
    } else {
      this.multiChoiceAnswer = {};
    }

    // if (finalAnswers && !this.id) {
    //   this.multiChoiceAnswer = finalAnswers;
    // } else if (!this.id) {
    //   this.multiChoiceAnswer = {};
    // }

  }

  multiChoiceCheckbox(event: any, i: any, list: any, key: any) {

    if (event.target.checked == true) {

      if (this.multiChoiceAnswer[key] && this.multiChoiceAnswer[key].length) {
        this.multiChoiceAnswer[key].push(list);
      } else {
        this.multiChoiceAnswer[key] = [];
        this.multiChoiceAnswer[key].push(list);
      }

    } else {

      let ind = this.multiChoiceAnswer[key].findIndex((v: any) => v.title == list.title);
      if (ind > -1) {
        this.multiChoiceAnswer[key].splice(ind, 1);
      }

    }

    this.activePageData.template.template.multipleChoice['finalAnswer'] = this.multiChoiceAnswer


  }
}
