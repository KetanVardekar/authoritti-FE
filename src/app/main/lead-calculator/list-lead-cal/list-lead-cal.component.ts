import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';
import { DeletePopupComponent } from '../../apps/delete-popup/delete-popup.component';
import { ReportPopupComponent } from '../../apps/report-popup/report-popup.component';

@Component({
  selector: 'app-list-lead-cal',
  templateUrl: './list-lead-cal.component.html',
  styleUrls: ['./list-lead-cal.component.css']
})
export class ListLeadCalComponent implements OnInit {

  reportsList: any = [];
  uniqueName: any;
  appTitle: any;
  constructor(private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private commonService: CommonService,
    private modalService: NgbModal,

    private leadService: LeadCalculatorService,
    private router: Router) { }

  ngOnInit(): void {

    this.commonService.setMainTitleToggle('Lead Calculator');
    this.getReport();
  }

  getReport() {
    this.loader.start();
    this.leadService.getLeadCalculatorList().subscribe((res: any) => {
      this.reportsList = res.data;
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
        // this.appsListService.checkUniqueName('leadCalculator', payload).subscribe((res: any) => {
        //   if (res.data == true) {
        //     this.loader.start();
        //     this.toaster.error(res.message);
        //     this.loader.stop();
        //   } else {
        this.startNewReport();
        this.loader.stop();
        //   }
        // }, (error) => {
        //   this.toaster.error(error.error.message);
        //   this.loader.stop();
        // })
      }

    });

  }

  startNewReport() {
    this.router.navigate(['leadCalculator/add-edit-annualGoal/' + this.uniqueName]);
  }

  editReport(reportId: any) {
    this.router.navigate(['leadCalculator/add-edit-annualGoal/report/' + reportId]);
  }

  printReport(reportId: any) {

    const queryParams: any = {};
    queryParams.fromPrint = true;
    const navigationExtras: NavigationExtras = {
      queryParams,
    };

    this.router.navigate(
      ['leadCalculator/lead-summary/report/' + reportId],
      navigationExtras
    );
  }
deleteReport(id:any){
  const modalRef = this.modalService.open(DeletePopupComponent, {
    size: 'l',
  })
  modalRef.result.then((result:any)=>{
    if(result){
      this.leadService.deleteLead(id).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.loader.start();
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
  // deleteReport(id: any) {
  //   this.leadService.deleteLead(id).subscribe((res: any) => {
  //     if (res.statusCode == 200) {
  //       this.loader.start();
  //       this.toaster.success(res.message);
  //       this.getReport()
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop();
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })
  // }

}
