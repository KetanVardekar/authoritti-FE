import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() data: any = null;
  @Input() index:number = 0;
  @Input() viewMode:any = null;
  constructor() { }

  ngOnInit(): void {
if (this.data.finalAnswer) {
      this.data.finalAnswer = this.data.finalAnswer;
    } else {
      this.data.finalAnswer = '';
    }
  }

}
