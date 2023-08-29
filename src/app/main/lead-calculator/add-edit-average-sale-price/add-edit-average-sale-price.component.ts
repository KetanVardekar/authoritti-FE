import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../../apps/delete-popup/delete-popup.component';
@Component({
  selector: 'app-add-edit-average-sale-price',
  templateUrl: './add-edit-average-sale-price.component.html',
  styleUrls: ['./add-edit-average-sale-price.component.css']
})
export class AddEditAverageSalePriceComponent implements OnInit, OnDestroy {

  showSidebar = false;
  appObj: any = {};
  uniqueName: any;
  totalSales = 0;
  id: any;
  sideBarSubscription: Subscription = new Subscription();
  constructor(private commonService: CommonService,
    private leadService: LeadCalculatorService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toaster: ToastrService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {

      if (params.reportName) {
        this.uniqueName = params.reportName;
      }

      if (params.id) {
        this.id = params.id;
      }

    })

    this.commonService.setMainTitleToggle('Lead Calculator');

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.appObj = this.leadService.appObj;

    if (this.appObj['averageSalePrice'] && this.appObj['averageSalePrice'].length) {
      this.appObj['averageSalePrice'] = this.appObj['averageSalePrice'];
      this.calcPer();
    } else {
      this.appObj['averageSalePrice'] = [];
      this.appObj['averageSalePrice'].push(new AverageSalePrice());
    }

  }

  previousPage() {
    this.leadService.storeAppObj('averageSalePrice', []);

    if (this.id) {
      this.router.navigate(['leadCalculator/add-edit-annualGoal/report/' + this.id]);
    } else {
      this.router.navigate(['leadCalculator/add-edit-annualGoal/' + this.uniqueName]);
    }

  }

  nextPage() {

    this.leadService.storeAppObj('averageSalePrice', this.appObj['averageSalePrice']);

    if (this.id) {
      this.router.navigate(['leadCalculator/add-edit-averageSaleRequired/report/' + this.id]);
    } else {
      this.router.navigate(['leadCalculator/add-edit-averageSaleRequired/' + this.uniqueName]);
    }

  }

  addSales(item: any) {

    if (item.product && item.dollarPerItem && item.totalPercentageSales) {
      this.appObj['averageSalePrice'].push(new AverageSalePrice());
    } else {
      this.toaster.warning("Enter all fields");
    }

    this.calcPer();
  }

  valid = false;
  calcPer() {
    this.totalSales = 0;
    this.appObj['averageSalePrice'].forEach((element: any) => {
      this.totalSales = this.totalSales + element.totalPercentageSales;
    });

    this.valid = true;
    for (let i = 0; i < this.appObj['averageSalePrice'].length; i++) {

      let ele = this.appObj['averageSalePrice'][i];
      if (ele.product && ele.dollarPerItem && ele.totalPercentageSales) {
        this.valid = true;
      } else {
        this.valid = false;
        break;
      }
    }
  }
  removeSales(i: any) {
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result: any) => {
      if (result) {
        this.appObj['averageSalePrice'].splice(i, 1);
        if (this.appObj['averageSalePrice'] && this.appObj['averageSalePrice'].length) {

        } else {
          this.appObj['averageSalePrice'] = [];
          this.appObj['averageSalePrice'].push(new AverageSalePrice());
        }

        this.calcPer();
      }
    })
  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
  // removeSales(i: any) {

  //   this.appObj['averageSalePrice'].splice(i, 1);
  //   if (this.appObj['averageSalePrice'] && this.appObj['averageSalePrice'].length) {

  //   } else {
  //     this.appObj['averageSalePrice'] = [];
  //     this.appObj['averageSalePrice'].push(new AverageSalePrice());
  //   }

  //   this.calcPer();

  // }

}

export class AverageSalePrice {

  product: any;
  dollarPerItem: any;
  totalPercentageSales: any;

  constructor() {
    this.product = '';
    this.dollarPerItem = null;
    this.totalPercentageSales = null;
  }
}
