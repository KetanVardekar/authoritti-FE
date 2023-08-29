import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from '../../services/app.service';
import { AppListService } from '../../services/apps-list.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.css']
})
export class PrintReportComponent implements OnInit {

  pageData: any;
  addedReport: any;
  reportName: any;
  reportType: any;
  reportId: any;
  appId: any;
  appUpdatedAt:any
  constructor(private router: Router,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private appService: AppService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private appsListService: AppListService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {

      if (params.id) {
        this.reportId = params.id;
      }

      if (params.appId) {
        this.appId = params.appId;
      }
    });


    const fromPrint = this.route.snapshot.queryParamMap.get("fromPrint");

    if (fromPrint) {
      this.getReportData();
    }
  }

  getReportData() {
    this.loader.start();
    this.appsListService.getReportById(this.reportId).subscribe((res: any) => {
      this.pageData = res?.data[0].answers_obj;
      this.addedReport = res?.data[0].answers_obj;
      this.reportName = res?.data[0].name;
      this.appUpdatedAt = res.data[0].updatedAt;
      this.reportType = res?.data[0].reportType;
      this.commonService.setHomeIconToggle({ showIcon: true, appId: this.appId });
      this.loader.stop();
      setTimeout(() => {
        this.PrintReport();
      }, 0);

    })

  }

  PrintReport() {
    this.commonService.setPrintReport(true);
  }

}
