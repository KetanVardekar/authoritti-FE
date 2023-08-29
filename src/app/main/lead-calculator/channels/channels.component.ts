import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { LeadCalculatorService } from 'src/app/shared/services/lead-calculator.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit , OnDestroy{

  showSidebar = false;
  appObj: any = {};
  uniqueName: any;
  sideBarSubscription:Subscription = new Subscription();
  id:any;
  channelsName: any[] = [
    { checked:false, id: "1", name: "Linkedin Organic Content" },
    { checked:false, id: "2", name: "Google Adwords" },
    { checked:false, id: "3", name: "Networking" },
    { checked:false, id: "4", name: "Facebook Organic Content" },
    { checked:false, id: "5", name: "SEO" },
    { checked:false, id: "6", name: "Referral Partner Program" },
    { checked:false, id: "7", name: "YouTube Organic Content" },
    { checked:false, id: "8", name: "Linkedin Advertising" },
    { checked:false, id: "9", name: "Email Marketing" },
    { checked:false, id: "10", name: "Instagram Organic Content" },
    { checked:false, id: "11", name: "Facebook Advertising" },
    { checked:false, id: "12", name: "Keynote speaking" },
    { checked:false, id: "13", name: "Twitter Organic Content" },
    { checked:false, id: "14", name: "Instagram Advertising" },
    { checked:false, id: "15", name: "Blogging" },
    { checked:false, id: "16", name: "TikTok Organic Content" },
    { checked:false, id: "17", name: "Twitter Advertising" },
    { checked:false, id: "18", name: "Guest Writer – Magazine" },

  ];
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

    if (this.appObj['channelsSelected'] && this.appObj['channelsSelected'].length) {
      this.appObj['channelsSelected'] = this.appObj['channelsSelected'];

      this.appObj['channelsSelected'].forEach((element:any) => {

        let el = this.channelsName.findIndex(v => v.id == element.id);
        if(el > -1){
          this.channelsName[el].checked = true;
        }
      });
    } else {
      this.appObj['channelsSelected'] = [];
    }

  }

  previousPage() {
    this.leadService.storeAppObj('channelsSelected', []);

    if(this.id){
      this.router.navigate(['leadCalculator/add-edit-leadsRequired/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/add-edit-leadsRequired/' + this.uniqueName]);
    }

  }

  nextPage() {

    this.leadService.storeAppObj('channelsSelected', this.appObj['channelsSelected']);

    if(this.id){
      this.router.navigate(['leadCalculator/lead-summary/report/' + this.id]);
    } else{
      this.router.navigate(['leadCalculator/lead-summary/' + this.uniqueName]);
    }

  }

  multiChoiceCheckbox(event: any, data: any, i: number) {

    if (event.target.checked) {
      this.appObj['channelsSelected'].push(data);
    } else {
      let index = this.appObj['channelsSelected'].findIndex((v: any) => v.name == data.name);
      if (index > -1) {
        this.appObj['channelsSelected'].splice(index, 1);
        data.checked = false;
        event.target.checked = false;
      }

    }

  }


  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
