import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit {
  @Input() data: any = null;
  @Input() index:number = 0;
  options: any = [];
  @Input() viewMode:any = null;

  constructor() { }

  ngOnInit(): void {

    if (this.data.finalAnswer) {

      this.data.options.forEach((ele: any, index: number) => {
        this.options.push({ key: index, value: ele })
      })
      this.options.forEach((ele: any) => {
        ele['checked'] = false;
        if (ele.value == this.data.finalAnswer) {
          ele['checked'] = true;
        }
      })
    } else {
      Object.assign(this.data, { finalAnswer: "" })

      this.data.options.forEach((ele: any, index: number) => {
        this.options.push({ key: index, value: ele })
      })
      this.options.forEach((ele: any) => {
        ele['checked'] = false
      })

    }


  }
  singleChoiceRadio(event: any, data: any, i: number) {
    if (event.target.checked) {
      this.data.finalAnswer = data
    }

  }
}
