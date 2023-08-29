import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarShow = false;
  activeTab: any = '';
  userData: any;

  @Input() appsList: any = [];
  constructor(private router: Router, private commonService: CommonService,) { }

  ngOnInit(): void {

    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);

    this.activeTab = this.router.url?.split('/')[1];
    if (this.router.url?.split('/')[1] == 'apps') {
      this.activeTab = this.router.url?.split('/')[2];
    }
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (event.url) {
            this.activeTab = event.url.split('/')[1];

            if (event.url.split('/')[1] == 'apps') {
              this.activeTab = event.url.split('/')[2];
            }
          }
        }
      }
    );

    this.appsList = this.appsList.filter((v: any) => v.active);

    this.appsList = this.appsList.filter((ele: any) => {
      if (this.userData.permissions && this.userData.permissions.length) {
        if (this.userData.permissions.includes(ele._id)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigate(module: any, isAppId?: any, app?: any) {
    this.commonService.setSidebarToggle(false);
    if (isAppId) {
      this.router.navigate(['/' + 'apps/' + isAppId + '/reports']);
    } else {
      this.router.navigate(['/' + module]);
    }

  }
}
