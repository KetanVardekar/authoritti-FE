import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../services/app.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-arc-type',
  templateUrl: './arc-type.component.html',
  styleUrls: ['./arc-type.component.css']
})
export class ArcTypeComponent implements OnInit, OnDestroy {
  @Input() reportData: any = null
  @Input() data: any;
  @Input() updatedAt = null;
  @Input() appUpdatedOn: any = null;
  groupData: any = {};
  obj: any
  userData: any;
  appTitle: any;
  appId: any;
  appUpdatedAt: any;
  report: any;
  filteredCategory: any;
  categoryValue: any;
  newCategories: any;
  categoryName: any;
  sortedValue: any
  arcTypeList: any = [];
  newArray: any = []
  categoryScore: any = [];
  printSubscriber: Subscription = new Subscription();
  sortedCategoryName: any = [];
  sortedCategoryScore: any = [];
  constructor(private commonService: CommonService,
    private route: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private appService: AppService,) { }

  ngOnInit(): void {
    this.loader.start();
    if (this.appUpdatedOn) {
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

    this.printSubscriber = this.commonService.printReport.subscribe((res: any) => {

      document.getElementById("print")?.click();
      // this.printSubscriber.unsubscribe();

    })

    this.report = this.reportData.filter((ele: any) => ele.questioner)

    this.report.forEach((ele: any) => {
      if (ele?.questioner?.categories) {
        if (this.groupData[ele.questioner.categories.name] && this.groupData[ele.questioner.categories.name].length) {
          this.groupData[ele.questioner.categories.name] = [...this.groupData[ele.questioner.categories.name], ...ele.questioner.questions]
        } else {
          this.groupData[ele.questioner.categories.name] = ele.questioner.questions;
        }
      }
    })

    this.categoryName = Object.keys(this.groupData)
    this.categoryValue = Object.values(this.groupData)
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

    this.categoryName.forEach((ele: any, index: any) => {
      this.arcTypeList.push(
        {
          [ele]: this.categoryScore[index],
          'score': this.categoryScore[index]
        }
      )
    })


    this.arcTypeList.sort((a: any, b: any) => parseFloat(b.score) - parseFloat(a.score))

    this.arcTypeList.forEach((object: any) => {
      delete object['score'];
    });

    this.arcTypeList.forEach((ele: any) => {
      this.sortedCategoryName.push(Object.keys(ele))
      this.sortedCategoryScore.push(Object.values(ele))
    })
    this.loader.stop();
  }

  ngOnDestroy(): void {
    this.printSubscriber.unsubscribe();
  }

}
