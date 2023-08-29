import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Home';
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {

     this.commonService.setMainTitleToggle(this.title);
  }

}
