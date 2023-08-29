import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../services/app.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-egoistic-type',
  templateUrl: './egoistic-type.component.html',
  styleUrls: ['./egoistic-type.component.css']
})
export class EgoisticTypeComponent implements OnInit , OnDestroy{
  @Input()updatedAt:any=null
  appId: any;
  appTitle: any;
  appUpdatedAt: any;
  userData: any;
  groupData: any = {};
  report: any;
  categoryValue: any;
  categoryName: any;
  allQuestionsData: any;
  driverCalc: any
  newArray: any = []
  allQuestions: any = [];
  categoryScore: any = [];
  driverReportCalc: any = [];
  totalValueOfDriverReport: any
  @Input() reportData: any = null;
  @Input() appUpdatedOn:any = null;
  @Input() data: any = null;
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
    })

    this.printSubscription = this.commonService.printReport.subscribe((res: any) => {
      document?.getElementById("print")?.click();
      // this.printSubscription.unsubscribe();
    })

    this.report = this.reportData.filter((ele: any) => ele.questioner)
    this.report.forEach((ele: any) => {
if(ele?.questioner?.categories){
      if (this.groupData[ele?.questioner?.categories?.name] && this.groupData[ele?.questioner?.categories?.name].length) {
        this.groupData[ele?.questioner?.categories?.name] = [...this.groupData[ele?.questioner?.categories?.name], ...ele?.questioner?.questions]
      } else {
        this.groupData[ele?.questioner?.categories?.name] = ele?.questioner?.questions;
      }
    }
    })
    this.categoryName = Object.keys(this.groupData)
    this.categoryValue = Object.values(this.groupData)
    this.categoryValue.filter((ele: any) => {
      let data = ele.filter((res: any) => {
        return res.id.question
      })
      this.allQuestions.push(data)
      this.allQuestionsData = [...this.allQuestions]
    })



    let totalNoOfQuestions = 0
    this.allQuestionsData.forEach((ele: any) => {
      totalNoOfQuestions += ele.length
    })

    this.categoryValue.filter((ele: any) => {
      let data = ele.filter((res: any) => {
        return res?.id?.question?.slider
      })
      this.newArray.push(data)
      this.categoryValue = [...this.newArray]
    })
    this.categoryValue.filter((ele: any) => {
      if (ele.length) {
        let total = 0;
        ele.forEach((res: any) => {

          total += res?.id?.question?.slider?.finalAnswer?.value

        })
        this.categoryScore.push(total)
      }
    })
    this.categoryScore.forEach((response: any) => {
      this.driverCalc = (10 * response) / totalNoOfQuestions;
      this.driverReportCalc.push(Math.round(this.driverCalc))
    })

    ///For Calculating Overall Percentage of
    let totalSumOfSliderValue = 0
    this.allQuestionsData.forEach((element: any) => {

      element.forEach((response: any) => {
        if (response?.id?.question?.slider?.finalAnswer?.value >= 1) {
          totalSumOfSliderValue += response?.id?.question?.slider?.finalAnswer?.value
        }
      })
    })
    this.totalValueOfDriverReport = Math.round((totalSumOfSliderValue * 10) / totalNoOfQuestions);
    this.loader.stop();
  }

  ngOnDestroy(): void {
    this.printSubscription.unsubscribe();
  }

}
