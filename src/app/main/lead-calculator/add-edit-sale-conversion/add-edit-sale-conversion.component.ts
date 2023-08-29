import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';

@Component({
  selector: 'app-add-edit-sale-conversion',
  templateUrl: './add-edit-sale-conversion.component.html',
  styleUrls: ['./add-edit-sale-conversion.component.css']
})
export class AddEditSaleConversionComponent implements OnInit , OnDestroy{

  showSidebar = false;
  appObj: any = {};
  uniqueName: any;
  id:any;
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

      if(params.id){
        this.id = params.id;
      }
    })

    this.commonService.setMainTitleToggle('Lead Calculator');

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.appObj = this.leadService.appObj;

    this.appObj['saleConversion'] = this.appObj['averageSaleRequired'];

    if (this.appObj['saleConversion'] && this.appObj['saleConversion'].length) {
      this.appObj['saleConversion'].forEach((element: any) => {

        element['salesRequiredInUnits'] = (element['totalSalesPerItem']) / (element['dollarPerItem']);
        element['closeRate'] = element['closeRate'] ? element['closeRate'] : null;
      });
    }

    this.isValid();
  }

  previousPage() {
    this.leadService.storeAppObj('saleConversion', []);

    if(this.id){
      this.router.navigate(['leadCalculator/add-edit-averageSaleRequired/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/add-edit-averageSaleRequired/' + this.uniqueName]);
    }

  }

  nextPage() {

    this.leadService.storeAppObj('saleConversion', this.appObj['saleConversion']);

    if(this.id){
      this.router.navigate(['leadCalculator/add-edit-leadsRequired/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/add-edit-leadsRequired/' + this.uniqueName]);
    }

  }

  valid = false;
  isValid() {

    for (let i = 0; i < this.appObj['averageSaleRequired'].length; i++) {

      let ele = this.appObj['averageSaleRequired'][i];
      if (ele.closeRate) {
        this.valid = true;
      } else {
        this.valid = false;
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }

}
