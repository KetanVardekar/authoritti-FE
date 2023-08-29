import { Component, Input, OnInit } from '@angular/core';
import { jackInTheBoxAnimation } from 'angular-animations';

@Component({
  selector: 'app-questioner',
  templateUrl: './questioner.component.html',
  styleUrls: ['./questioner.component.css']
})
export class QuestionerComponent implements OnInit {
  finalAnswerSize: any;
  questionList: any = [];
  @Input() pageData: any = null
  @Input() data: any = null;
  @Input() listData: any = null;
  @Input() multiCol: any = null;
  @Input() viewMode: any = null;
  @Input() currentIndex: any = null;


  questionsList: any;
  professionAnswer: any
  constructor() { }

  ngOnInit(): void {

    if (this.listData) {
      this.questionList = this.listData?.questions;
    } else if (this.data) {
      this.questionList = this.data?.questions;
    }

  }

}
