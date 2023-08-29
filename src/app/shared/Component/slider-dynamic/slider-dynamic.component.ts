import { Options } from "@angular-slider/ngx-slider";
import { HttpParams } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-slider-dynamic',
  templateUrl: './slider-dynamic.component.html',
  styleUrls: ['./slider-dynamic.component.css']
})
export class SliderDynamicComponent implements OnInit {
  id: any
  @Input() allPagesData: any = [];
  @Input() currentIndex: any = null;
  @Input() activePageData: any = null;

  sliderTitle: any = null
  @Output() gotoPreviousPage = new EventEmitter()

  sliderData: any = null;
  sliderValue: any;
  sliderDefaultAnswer: any
  options: Options = {
    showTicksValues: true,
    showSelectionBar: true,
    stepsArray: []
  };
  sliderArray: any = {};
  @Input() viewMode: any = null;

  constructor(private toaster: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.options.disabled = this.viewMode ? true : false;

    let previousPage = this.allPagesData[this.currentIndex - 1];

    if (previousPage?.questioner) {

      if (previousPage?.questioner?.questions && previousPage?.questioner?.questions?.length) {

        let multiChoiceQuestion = previousPage?.questioner?.questions?.find((v: any) => v.id?.question?.multipleChoice)
        if (multiChoiceQuestion) {
          this.sliderTitle = multiChoiceQuestion?.id?.question?.multipleChoice?.finalAnswer;

        } else {
          this.toaster.warning("No multiple choice questions available in Questioner");
          this.gotoPreviousPage.emit(this.currentIndex - 1);
        }

      } else {
        this.toaster.warning("No questions available in previous questioner");
        this.gotoPreviousPage.emit(this.currentIndex - 1);
      }

    } else {
      this.toaster.warning("Previous page must be a Questionnaire.");
      this.gotoPreviousPage.emit(this.currentIndex - 1);
    }

    this.sliderData = this.activePageData?.template?.template?.slider;

    let counter = this.sliderData.minVal;
    this.sliderData.tag.forEach((ele: any) => {
      if (counter == this.sliderData.minVal) {
        this.options.stepsArray?.push({ value: counter, legend: this.sliderData.minValLabel ? this.sliderData.minValLabel : ele })
      } else if (counter == this.sliderData.maxVal) {
        this.options.stepsArray?.push({ value: counter, legend: this.sliderData.maxValLabel ? this.sliderData.maxValLabel : ele })
      } else {
        this.options.stepsArray?.push({ value: counter, legend: ele })
      }

      counter++;

    });


    let array: any = []


    if (this.sliderData?.finalAnswer && this.sliderData?.finalAnswer.length) {
      this.sliderTitle.forEach((ele: any) => {
        let index = this.sliderData?.finalAnswer.findIndex((x: any) => x.title == ele);
        if (index != -1) {
          array.push(this.sliderData?.finalAnswer[index])
        } else {
          array.push({ 'title': ele })
        }
      })
    }

    this.sliderArray['finalAnswer'] = [];

    this.sliderTitle.forEach((element: any) => {

      if (this.sliderData?.finalAnswer && this.sliderData?.finalAnswer.length) {
        this.sliderArray['finalAnswer'] = array;
      } else {

        if (this.sliderData.defaultAnswer) {

          let obj = this.options.stepsArray?.find(v => v.value == this.sliderData?.defaultAnswer);
          if (obj) {
            let slidObj = {
              title: element,
              legend: obj.legend,
              score: obj.value,
              scoreName: this.sliderData.tag[this.sliderData?.defaultAnswer - this.sliderData?.minVal],
            }
            this.sliderArray['finalAnswer'].push(slidObj);
          } else {

            let obj: any = this.options.stepsArray?.shift();
            let slidObj = {
              title: element,
              legend: obj.legend,
              score: obj.value,
              scoreName: this.sliderData?.tag[this.sliderData?.minVal - this.sliderData?.minVal],
            }
            this.sliderArray['finalAnswer'].push(slidObj);
          }

        } else {
          let obj: any = this.options.stepsArray?.shift();
          let slidObj = {
            title: element,
            legend: obj.legend,
            score: obj.value,
            scoreName: this.sliderData?.tag[this.sliderData?.minVal - this.sliderData?.minVal],
          }
          this.sliderArray['finalAnswer'].push(slidObj);
        }

      }
    });


    this.sliderData['finalAnswer'] = this.sliderArray['finalAnswer'];

    this.activePageData.template.template.slider = this.sliderData;


  }

  formStructure(event: any, title: any, i: any) {

    let obj = this.options.stepsArray?.find(v => v.value == event);
    if (obj) {

      let slidObj = {
        title: title,
        legend: obj.legend,
        score: obj.value,
        scoreName: this.sliderData.tag[obj.value - this.sliderData?.minVal],
      }

      this.sliderData.finalAnswer[i] = slidObj;

    }

    this.activePageData.template.template.slider = this.sliderData;
  }

}
