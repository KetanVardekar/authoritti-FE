import { Component, Input, OnInit } from '@angular/core';
// import {DomSanitizationService} from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  @Input() data:any = null;
  videoLink :any;
  constructor() { }

  ngOnInit(): void {
    this.videoLink = this.data.videolink;
  }

}
