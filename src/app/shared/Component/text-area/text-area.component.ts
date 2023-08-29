import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
  @Input() data: any = null;
  @Input() index:number = 0;
  @Input() viewMode:any = null;
  textAreaPlaceholder: any
  constructor() { }

  ngOnInit(): void {

    if(this.data.finalAnswer){
      this.data.finalAnswer = this.data.finalAnswer;
    } else{
      this.data.finalAnswer = '';
    }
  }
}
