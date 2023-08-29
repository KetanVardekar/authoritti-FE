import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-yes-no-dynamic',
  templateUrl: './table-yes-no-dynamic.component.html',
  styleUrls: ['./table-yes-no-dynamic.component.css']
})
export class TableYesNoDynamicComponent implements OnInit {

  @Input() allPagesData: any = [];
  @Input() currentIndex: any = null;
  @Input() activePageData: any = null;

  @Output() gotoPreviousPage = new EventEmitter();

  tableYesNoData: any = null;
  yesNoArray: any = [];

  constructor(private toaster: ToastrService) { }

  ngOnInit(): void {

    this.tableYesNoData = this.activePageData?.template?.template?.tableYesNo;

    let previousPage = this.allPagesData[this.currentIndex - 1];

    if (previousPage.dynamic_question) {

      if (previousPage.dynamic_question.template.template.slider) {

        if (previousPage.dynamic_question.template.template.slider.finalAnswer &&
          previousPage.dynamic_question.template.template.slider.finalAnswer.length) {

          previousPage.dynamic_question.template.template.slider.finalAnswer.forEach((element: any) => {

            if (element.score >= previousPage.dynamic_question.template.template.slider.filterOn) {
              this.yesNoArray.push(element)
            }
          });
        }

      } else {
        this.toaster.warning("Previous dynamic Questioner must be of type Slider");
        this.gotoPreviousPage.emit(this.currentIndex - 1);
      }

    } else {
      this.toaster.warning("Previous page must be a Dynamic Questionnaire.");
      this.gotoPreviousPage.emit(this.currentIndex - 1);
    }

    if (this.yesNoArray && this.yesNoArray.length) {
      this.yesNoArray = this.yesNoArray.sort((a: any, b: any) => parseFloat(b.score) - parseFloat(a.score));

      if (this.tableYesNoData.finalAnswer && this.tableYesNoData.finalAnswer.length) {
        this.tableYesNoData.finalAnswer.forEach((element:any) => {
          if(!element.isYesNo){
            element['isYesNo'] = '';
          }
        });
      } else {
        this.yesNoArray.forEach((element: any) => {
          element['isYesNo'] = '';
        });
      }

    }

  }


  changeAnswer(event: any, i: any) {

    this.tableYesNoData['finalAnswer'] = this.yesNoArray;

  }
}
