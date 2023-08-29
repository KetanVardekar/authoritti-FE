import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';

@Component({
  selector: 'app-add-edit-leads-required',
  templateUrl: './add-edit-leads-required.component.html',
  styleUrls: ['./add-edit-leads-required.component.css']
})
export class AddEditLeadsRequiredComponent implements OnInit , OnDestroy {

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

    this.appObj['leadsRequired'] = this.appObj['saleConversion'];

    if (this.appObj['leadsRequired'] && this.appObj['leadsRequired'].length) {
      this.appObj['leadsRequired'].forEach((element: any) => {
        element['requiredLeads'] = (element['salesRequiredInUnits'] * element['closeRate']);
      });
    }

  }

  previousPage() {
    this.leadService.storeAppObj('leadsRequired', []);

    if(this.id){
      this.router.navigate(['leadCalculator/add-edit-saleConversion/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/add-edit-saleConversion/' + this.uniqueName]);
    }

  }

  nextPage() {

    this.leadService.storeAppObj('leadsRequired', this.appObj['leadsRequired']);

    if(this.id){
      this.router.navigate(['leadCalculator/channels/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/channels/' + this.uniqueName]);
    }

  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }


}
