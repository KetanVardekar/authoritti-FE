import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit , OnDestroy {

  public sidebarShow: boolean = false;
  appsList = [];
  sideBarSubscription:Subscription = new Subscription();

  constructor(private commonService: CommonService, private appService: AppService, private toaster: ToastrService,
    private loader: NgxUiLoaderService) { }

  ngOnInit(): void {

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.sidebarShow = res;
    });

    this.getAllApps();
  }

  getAllApps() {

    this.loader.start();
    this.appService.getAllApps().subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.appsList = res.data;
        // this.toaster.success(res.message);
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

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
