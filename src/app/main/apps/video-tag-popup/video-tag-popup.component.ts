import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-video-tag-popup',
  templateUrl: './video-tag-popup.component.html',
  styleUrls: ['./video-tag-popup.component.css']
})
export class VideoTagPopupComponent implements OnInit {

  @Input() videoLink :any;
  constructor() { }

  ngOnInit(): void {

  }

}
