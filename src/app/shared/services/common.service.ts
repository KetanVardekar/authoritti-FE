import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  sidebarToggle = new Subject();
  homeIconToggle = new Subject();
  mainTitle = new Subject();
  printReport = new Subject();
  appTitle = new Subject();
  selected = new Subject();
  calculated = new Subject();
  professsionValue = new Subject();
  passionValue = new Subject();
  videoLink = new Subject();
  constructor() { }

  setProfessionValue(value: any) {
    this.professsionValue.next(value);
  }
  setPassionValue(value: any) {
    this.passionValue.next(value);
  }
  setSidebarToggle(value: boolean) {
    this.sidebarToggle.next(value);
  }
  setVideoLink(value: any) {
    this.videoLink.next(value)
  }
  setHomeIconToggle(value: any) {
    this.homeIconToggle.next(value);
  }
  setMainTitleToggle(value: string) {
    this.mainTitle.next(value);
  }
  setPrintReport(value: boolean) {
    this.printReport.next(value);
  }
  selectEmotion(value: boolean) {
    this.selected.next(value)
  }
  calculateEmotion(value: boolean) {
    this.calculated.next(value)
  }
  dependencyJSON(input: any) {

    let obj = input;

  }

}
