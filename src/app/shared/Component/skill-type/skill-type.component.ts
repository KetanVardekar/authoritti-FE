import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { CommonService } from '../../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-skill-type',
  templateUrl: './skill-type.component.html',
  styleUrls: ['./skill-type.component.css']
})
export class SkillTypeComponent implements OnInit , OnDestroy {
  appId: any;
  appTitle: any;
  appUpdatedAt: any;
  userData: any;
  questionerData: any;
  elementOfObj: any;
  mainCategoryHeading: any;
  quesDynamic:any
  questionerDynamicGroup:any={};
  groupCategoryData: any = {};
  @Input() data: any = null;
  @Input() updatedAt = null;
  @Input() reportData: any = null;
  @Input() appUpdatedOn:any = null;
  @Input() reportType: any = null;
  name = [
    {
      name: "Destroyer",
      score: 12,
    },
    {
      name: "Creator",
      score: 22,
    },
    {
      name: "Fool",
      score: 12,
    },
    {
      name: "Orphan",
      score: 32,
    },
    {
      name: "Sage",
      score: 15,
    },
    {
      name: "Ruler",
      score: 42,
    },
    {
      name: "Warrior",
      score: 20,
    },
    {
      name: "Innocent",
      score: 22,
    }
  ]
  printSubscription:Subscription = new Subscription();
  constructor(private commonService: CommonService,
    private route: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private appService: AppService,) { }

  ngOnInit(): void {
    if(this.appUpdatedOn){
      this.updatedAt = this.appUpdatedOn;
    }

    this.loader.start();
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

    this.questionerData = this.reportData.filter((ele: any) => ele.questioner);
    this.questionerData.forEach((ele: any) => {
      if (ele?.questioner?.categories) {
        if (this.groupCategoryData[ele.questioner?.categories?.name] && this.groupCategoryData[ele?.questioner?.categories?.name].length) {

          this.groupCategoryData[ele?.questioner?.categories?.name] = [...this.groupCategoryData[ele?.questioner?.categories?.name], ...ele.questioner.questions]

        } else {
          this.groupCategoryData[ele?.questioner?.categories?.name] = ele?.questioner?.questions;
        }
      }
    })
    let sortedData: any = [];
    for (let ele in this.groupCategoryData) {
      this.elementOfObj = this.groupCategoryData[ele]
      let value = 0;
      for (let element of this.elementOfObj) {
        if (element?.id?.question?.slider?.finalAnswer?.value) {
          value = value + element.id.question.slider.finalAnswer.value
        }
      }
      if(value>=1){
      sortedData.push({ 'name': ele, 'score': value })
      }

    }
    this.mainCategoryHeading =sortedData;
    this.mainCategoryHeading.sort((a: any, b: any) => parseFloat(b.score) - parseFloat(a.score));
//Dynamic Data
this.quesDynamic = this.reportData.filter((ele: any) => ele.dynamic_question)

    this.quesDynamic.forEach((ele: any) => {

      if (ele?.dynamic_question?.group) {
        if (this.questionerDynamicGroup[ele?.dynamic_question?.group?.title] && this.questionerDynamicGroup[ele?.dynamic_question?.group?.title].length) {
          this.questionerDynamicGroup[ele?.dynamic_question?.group?.title] = [...this.questionerDynamicGroup[ele?.dynamic_question?.group?.title], ...[ele?.dynamic_question?.template]]
        } else {
          this.questionerDynamicGroup[ele?.dynamic_question?.group?.title] = [ele?.dynamic_question?.template];
        }
      }
    })
this.loader.stop();
  }

  ngOnDestroy(): void {
    this.printSubscription.unsubscribe();
  }
}
