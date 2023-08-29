import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-trait-type',
  templateUrl: './trait-type.component.html',
  styleUrls: ['./trait-type.component.css']
})
export class TraitTypeComponent implements OnInit , OnDestroy {
  appId: any;
  appTitle: any;
  appUpdatedAt: any;
  userData: any;
  report: any;
  category: any = {};
  groups: any = {}
  obj2: any = {};

  elementOfObj: any;
  value: any;
  keyValue: any;
  traitCalcinPercentage: any
  @Input() data: any = null;
  @Input() reportData: any = null;
  @Input() reportType: any = null;
  @Input() updatedAt = null;
  @Input() appUpdatedOn:any = null;
  printSubscription:Subscription = new Subscription();

  constructor(private commonService: CommonService,
    private route: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private appService: AppService,) { }

  ngOnInit(): void {
    this.loader.start();
    if(this.appUpdatedOn){
      this.updatedAt = this.appUpdatedOn;
    }
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.route.params.subscribe((res: any) => {

      this.appId = res.appId
    })

    this.appService.getAppById(this.appId).subscribe((res: any) => {

      this.appTitle = res.data.title
      this.appUpdatedAt = res.data.updatedAt
    });

    this.printSubscription = this.commonService.printReport.subscribe((res: any) => {

      document.getElementById("print")?.click();
      // this.printSubscription.unsubscribe();
    })

    this.report = this.reportData.filter((ele: any) => ele.questioner)


    this.report.forEach((res: any) => {
      let array: any = []
      res?.questioner?.questions.filter((ele: any) => {
        if (ele?.id?.question?.slider?.finalAnswer?.value >= 1) {
          array.push(ele.id.question.slider)

        }
      })
      res.questioner.questions = [...array]
    })


    this.category = this.report.reduce((acc: any, item: any) => {
      const key = item?.questioner?.categories?.name;

      if (acc[key]) {
        if (Object.keys(acc[key])[0] == item?.questioner?.categories?.name) {
          acc[key][item?.questioner?.group?.title] = { count: acc[key][item.questioner?.group?.title].item?.questioner?.questions }
        } else {
          if (acc[key][item?.questioner?.group?.title] && acc[key][item?.questioner?.group?.title].length) {
            acc[key][item?.questioner?.group?.title] = [...acc[key][item?.questioner?.group?.title], ...item?.questioner?.questions];
          } else {
            acc[key][item?.questioner?.group?.title] = item?.questioner?.questions;
          }

        }
      } else {
        acc[key] = {};
        acc[key][item?.questioner?.group?.title] = item?.questioner?.questions
      }
      return acc;
    }, {});

    // Calculating Question Lenth According To Category
    let categoryQuestionLength: any = {}

    for (let categoryName in this.category) {
      let element = categoryName
      let total = 0
      for (let groupName in this.category[categoryName]) {
        total += this.category[categoryName][groupName].length
        categoryQuestionLength[element] = total

      }
    }

    // Calculating Slider Value According to Category
    let categorySliderScore: any = {};
    for (let categoryValue in this.category) {
      let element1 = categoryValue;
      let totalSlider = 0;
      for (let groupValue in this.category[categoryValue]) {
        this.category[categoryValue][groupValue].forEach((ele: any) => {
          if (ele?.finalAnswer?.value) {
            totalSlider += ele?.finalAnswer?.value
            categorySliderScore[element1] = totalSlider
          }

        })
      }
    }

    // Calculating Final CALCULATION in Percentage
    let obj: any = {}
    for (let calc in categoryQuestionLength) {
      let categoryName = calc

      let totalNoOfquestion = categoryQuestionLength[calc]
      for (let sliderValue in categorySliderScore) {
        if (sliderValue === calc) {
          obj[categoryName] = Math.round(categorySliderScore[sliderValue] / totalNoOfquestion)
        }

      }
    }
    this.traitCalcinPercentage = obj



this.loader.stop();
  }

  ngOnDestroy(): void {
    this.printSubscription.unsubscribe();
  }

}
