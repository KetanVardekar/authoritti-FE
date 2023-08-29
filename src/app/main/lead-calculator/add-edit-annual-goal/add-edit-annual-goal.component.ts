import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';

@Component({
  selector: 'app-add-edit-annual-goal',
  templateUrl: './add-edit-annual-goal.component.html',
  styleUrls: ['./add-edit-annual-goal.component.css']
})
export class AddEditAnnualGoalComponent implements OnInit , OnDestroy {

  constructor(private commonService: CommonService,
    private leadService: LeadCalculatorService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxUiLoaderService) { }

  showSidebar = false;
  appObj: any = {};
  uniqueName: any;
  id: any;
  sideBarSubscription:Subscription = new Subscription();
  ngOnInit(): void {

    this.leadService.resetObj();

    this.route.params.subscribe((params: any) => {

      if (params.reportName) {
        this.uniqueName = params.reportName;
      }

      if (params.id) {
        this.id = params.id;
      }
    })

    if (this.id) {
      this.getReportDataById();
    } else {
      this.appObj = this.leadService.appObj;
    }

    this.commonService.setMainTitleToggle('Lead Calculator');

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });


  }

  nextPage() {

    this.leadService.storeAppObj('annualGoal', this.appObj['annualGoal']);

    if(this.id){
      this.router.navigate(['leadCalculator/add-edit-averageSalePrice/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/add-edit-averageSalePrice/' + this.uniqueName]);
    }

  }

  getReportDataById() {

    this.loader.start();
    this.leadService.getLeadById(this.id).subscribe((res: any) => {
      let pageData = res.data[0].answers_obj;
      this.uniqueName = res.data[0].name;

      if (pageData) {
        this.appObj = this.leadService.storeFullObj(pageData);
      }

      this.loader.stop();
    })

  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
