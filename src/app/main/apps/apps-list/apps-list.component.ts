import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.css']
})
export class AppsListComponent implements OnInit {

  appsList: any = [];
  title = 'Apps List';
  constructor(private router: Router,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private appService: AppService,
    private modalService: NgbModal,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.setMainTitleToggle(this.title);
    this.getAllApps();
  }
  addApps() {
    this.router.navigate(['apps/add'])
  }

  getAllApps() {

    this.loader.start();
    this.appService.getAllApps().subscribe((res: any) => {

      if (res.statusCode == 200) {
        this.appsList = res.data;
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
  deleteApp(id:any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.loader.start()
    this.appService.deleteAppById(id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getAllApps();
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
    })
  }
  // deleteApp(id: any) {
  //   this.loader.start()
  //   this.appService.deleteAppById(id).subscribe((res: any) => {
  //     if (res.statusCode == 200) {
  //       this.toaster.success(res.message);
  //       this.getAllApps();
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop()
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })
  // }
  activeInactive(id: any, event: any) {
    this.loader.start()
    let payload = {

      active: event.target.checked
    }

    this.appService.updateApp(payload, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.loader.stop()
      } else {
        this.toaster.error(res.message);
        this.loader.stop()
      }
    }, (error: any) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }
  editApp(id: any) {
    this.router.navigate(['apps/edit/' + id])
  }
  openPages(id: any, appTitle: any) {
    this.commonService.setMainTitleToggle(appTitle)
    // this.router.navigate(['apps/page/list/' + id]);
    this.router.navigate(['apps/' + id + '/page/list'])
  }
}
