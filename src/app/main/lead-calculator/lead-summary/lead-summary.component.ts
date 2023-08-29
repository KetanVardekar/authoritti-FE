import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';
import * as wijmo from "@grapecity/wijmo";

@Component({
  selector: 'app-lead-summary',
  templateUrl: './lead-summary.component.html',
  styleUrls: ['./lead-summary.component.css']
})
export class LeadSummaryComponent implements OnInit , OnDestroy {

  showSidebar = false;
  appObj: any = {};
  uniqueName: any;
  printReportFlag = false;
  reportData: any = null;
  id: any;
  userData: any;
  fromPrint: any = false;
  printSubscription:Subscription = new Subscription();
  sideBarSubscription:Subscription = new Subscription();
  constructor(private commonService: CommonService,
    private leadService: LeadCalculatorService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);

    this.route.params.subscribe((params: any) => {

      if (params.reportName) {
        this.uniqueName = params.reportName;
      }

      if (params.id) {
        this.id = params.id;
      }
    });

    this.printSubscription = this.commonService.printReport.subscribe((res: any) => {

      if (res) {
        document.getElementById("print")?.click();
        // this.printSubscription.unsubscribe();
      }

    })

    // this.commonService.setMainTitleToggle('Lead Calculator');

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.fromPrint = this.route.snapshot.queryParamMap.get("fromPrint");

    if (this.fromPrint) {
      this.getReportDataById();
    } else {
      this.appObj = this.leadService.appObj;

      if (this.appObj['reportType']) {
        this.appObj['reportType'] = this.appObj['reportType'];
      } else {
        this.appObj['reportType'] = "yearly";
      }
    }

  }

  getReportDataById() {

    this.loader.start();
    this.leadService.getLeadById(this.id).subscribe((res: any) => {
      let pageData = res.data[0].answers_obj;
      this.reportData = res.data[0];
      this.uniqueName = res.data[0].name;
      this.commonService.setMainTitleToggle(this.uniqueName);
      if (pageData) {
        this.appObj = this.leadService.storeFullObj(pageData);

        if (this.appObj['reportType']) {
          this.appObj['reportType'] = this.appObj['reportType'];
        } else {
          this.appObj['reportType'] = "yearly";
        }

        this.printReportFlag = true;
        this.cdr.detectChanges();
        this.PrintReport();
      }

      this.loader.stop();
    })

  }

  previousPage() {
    this.leadService.storeAppObj('reportType', "yearly");

    if (this.id) {
      this.router.navigate(['leadCalculator/channels/report/' + this.id]);
    } else {
      this.router.navigate(['leadCalculator/channels/' + this.uniqueName]);
    }

  }

  submit() {
    this.loader.start();
    let payload = {
      name: this.uniqueName
    }
    this.leadService.checkUniqueName(payload).subscribe((res: any) => {
      if (res.data == true) {
        this.toaster.error(res.message);
        this.loader.stop();
      } else {
        this.submitMain();
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    })

  }

  submitMain() {
    this.loader.start();
    let payload = {

      name: this.uniqueName,
      answers_obj: this.appObj,

    }
    this.leadService.createLead(payload).subscribe((res: any) => {

      if (res.statusCode == 200) {

        this.printReportFlag = true;
        this.commonService.setHomeIconToggle({ showIcon: true, appId: 'leadCalculator' });
        this.reportData = res.data;
        this.appObj = this.reportData.answers_obj;
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }

    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    })

  }

  updateReport() {
    this.loader.start();
    let payload = {
      name: this.uniqueName,
      answers_obj: this.appObj,
    }
    this.leadService.updateLead(this.id, payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.printReportFlag = true;
        this.commonService.setHomeIconToggle({ showIcon: true, appId: 'leadCalculator' });
        this.reportData = res.data;
        this.appObj = this.reportData.answers_obj;
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    })
  }

  PrintReport() {
    this.commonService.setPrintReport(true);
  }

  ngOnDestroy(): void {
    this.printSubscription.unsubscribe();
    this.sideBarSubscription.unsubscribe();
  }

}
