import { Router } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoTagPopupComponent } from 'src/app/main/apps/video-tag-popup/video-tag-popup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  showSidebar = false;
  showHomeIcon = false;
  title = '';
  videoLink: any
  appId: any = null;
  videLinkSubscription:Subscription = new Subscription;
  sideBarToggleSubscription:Subscription = new Subscription;
  homeIconToggleSubscription:Subscription = new Subscription;
  mainTitleSubscription:Subscription = new Subscription;
  constructor(private commonService: CommonService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.commonService.videoLink.subscribe((res: any) => {

      this.videoLink = res?.intro


    })
    this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.commonService.homeIconToggle.subscribe((res: any) => {
      this.showHomeIcon = res.showIcon;
      this.appId = res.appId;
    });

    this.commonService.mainTitle.subscribe((res: any) => {
      this.title = res;
    });
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: any): void {

    let icon = document.getElementById('menu-id');

    if (icon) {
      if (icon.contains(event.target)) {

      } else {
        this.commonService.setSidebarToggle(false);
      }
    }
  }

  toggle() {
    this.showSidebar = !this.showSidebar;
    this.commonService.setSidebarToggle(this.showSidebar);
  }

  gotoListing() {

    this.showHomeIcon = false;
    if (this.appId == 'leadCalculator') {
      this.router.navigate(['/' + this.appId]);
    } else {
      this.router.navigate(['/' + 'apps/' + this.appId + '/reports']);
    }

  }

  playVideo() {
    const modalRef = this.modalService.open(VideoTagPopupComponent, {
      size: 'l',
    })
    modalRef.componentInstance.videoLink = this.videoLink;
  }
ngOnDestroy(): void {
  this.videLinkSubscription.unsubscribe();
  this.sideBarToggleSubscription.unsubscribe();
  this.mainTitleSubscription.unsubscribe();
  this.homeIconToggleSubscription.unsubscribe();
}
}
