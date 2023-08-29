import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from 'src/app/shared/services/app.service';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { ReportPopupComponent } from '../report-popup/report-popup.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  reportList: any = [];
  appsList: any = [];
  title = '';
  appId = '';
  reportsList: any;
  introData: any
  report: any = false;
  pagesExceptReport: any = false;
  uniqueName: any;
  appTitle: any;
  appData: any;
  constructor(private router: Router,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private appService: AppService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private appsListService: AppListService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.title = 'Reports List';
    // this.commonService.setMainTitleToggle(this.title);
    this.route.url.subscribe((params: any) => {

      if (params && params.length) {
        this.appId = params[0].path;
      }
      if (this.appId) {
        this.getAppById();
      }

      // this.commonService.setMainTitleToggle(this.title);
      this.getReport();
    });


    // this.getReportByIdData();

  }

  addApps() {
    this.router.navigate(['apps/add'])
  }

  getAppById() {

    this.loader.start();
    this.appService.getAppById(this.appId).subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.introData = res.data.page.find((ele: any) => ele?.intro?.videolink)
        this.commonService.setVideoLink(this.introData)
        this.loader.start();
        this.appTitle = res.data.title;
        this.commonService.setMainTitleToggle(res.data.title);
        this.appData = res.data;
        let valid = false;
        let pageValid = false;
        for (let ele of this.appData.page) {
          if (ele.report) {
            if (ele.report.active) {
              valid = true;
            }
          }

          if (ele.intro) {
            if (ele.intro.active) {
              pageValid = true;
            }
          }

          if (ele.section) {
            if (ele.section.active) {
              pageValid = true;
            }
          }

          if (ele.questioner) {
            if (ele.questioner.active) {
              pageValid = true;
            }
          }

          if (ele.dynamic_question) {
            if (ele.dynamic_question.active) {
              pageValid = true;
            }
          }

        }

        if (valid) {
          this.report = true;
        }

        if (pageValid) {
          this.pagesExceptReport = true;
        }

        // this.toaster.success(res.message);
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    });

  }

  deleteApp(id: any) {

    this.appService.deleteAppById(id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.loader.start();
        this.toaster.success(res.message);
        this.getAppById();
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop()
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }

  editApp(id: any) {
    this.router.navigate(['apps/edit/' + id])
  }
  openPages(id: any) {
    this.router.navigate(['apps/' + id + '/page/list'])
  }
  calculateDiff(dateSent: any) {
    const currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
  getReport() {
    this.loader.start();
    this.appsListService.getReportData(this.appId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.reportsList = res.data;
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


  addReport() {
    const modalRef = this.modalService.open(ReportPopupComponent, {
      size: 'l',
    })
    modalRef.componentInstance.appTitle = this.appTitle;
    modalRef.result.then((res: any) => {
      this.uniqueName = res;
      let payload = {
        name: this.uniqueName
      }
      if (this.uniqueName) {
        this.loader.start();
        this.appsListService.checkUniqueName(this.appId, payload).subscribe((res: any) => {
          if (res.data == true) {

            this.toaster.error(res.message);
            this.loader.stop();
          } else {
            this.startNewReport();
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error.error.message);
          this.loader.stop();
        })
      }

    });

  }

  printReport(reportId: any) {

    const queryParams: any = {};
    queryParams.fromPrint = true;
    const navigationExtras: NavigationExtras = {
      queryParams,
    };

    this.router.navigate(
      ['apps/' + this.appId + '/print-report/' + reportId],
      navigationExtras
    );
  }

  editReport(reportId: any) {
    this.router.navigate(['apps/' + this.appId + '/reports/start-report/edit/' + reportId]);
  }

  startNewReport() {
    this.router.navigate(['apps/' + this.appId + '/reports/start-report/add/' + this.uniqueName]);
  }
  deleteReport(id: any) {
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result: any) => {
      if (result) {
        this.loader.start();
        this.appsListService.deleteReport(id).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.getReport()
            this.loader.stop();
          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      }
    })
  }


}
