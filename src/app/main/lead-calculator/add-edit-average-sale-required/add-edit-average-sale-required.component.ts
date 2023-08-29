import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';
import { AverageSalePrice } from '../add-edit-average-sale-price/add-edit-average-sale-price.component';

@Component({
  selector: 'app-add-edit-average-sale-required',
  templateUrl: './add-edit-average-sale-required.component.html',
  styleUrls: ['./add-edit-average-sale-required.component.css']
})
export class AddEditAverageSaleRequiredComponent implements OnInit , OnDestroy {

  showSidebar = false;
  appObj: any = {};
  uniqueName: any;
  id: any;
  sideBarSubscription:Subscription = new Subscription();
  constructor(private commonService: CommonService,
    private leadService: LeadCalculatorService,
    private router: Router,
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

    this.appObj['averageSaleRequired'] = this.appObj['averageSalePrice'];

    if (this.appObj['averageSaleRequired'] && this.appObj['averageSaleRequired'].length) {
      this.appObj['averageSaleRequired'].forEach((element: any) => {
        element['totalSalesPerItem'] = (this.appObj['annualGoal'] * element['totalPercentageSales']) / 100;
      });
    }

  }

  previousPage() {
    this.leadService.storeAppObj('averageSaleRequired', []);

    if (this.id) {
      this.router.navigate(['leadCalculator/add-edit-averageSalePrice/report/' + this.id]);
    } else {
      this.router.navigate(['leadCalculator/add-edit-averageSalePrice/' + this.uniqueName]);
    }

  }

  nextPage() {

    this.leadService.storeAppObj('averageSaleRequired', this.appObj['averageSaleRequired']);

    if (this.id) {
      this.router.navigate(['leadCalculator/add-edit-saleConversion/report/' + this.id]);
    } else {
      this.router.navigate(['leadCalculator/add-edit-saleConversion/' + this.uniqueName]);
    }

  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }

}
