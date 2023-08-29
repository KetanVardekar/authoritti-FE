import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-text-input',
  templateUrl: './multi-text-input.component.html',
  styleUrls: ['./multi-text-input.component.css']
})
export class MultiTextInputComponent implements OnInit {
  @Input() data: any = null;
  @Input() index: number = 0;
  @Input() viewMode:any = null;

  constructor() { }

  ngOnInit(): void {

    if (this.data.finalAnswer && this.data.finalAnswer.length) {
      this.data.finalAnswer.forEach((ele: any) => {
        this.data.placeholder['value'] = ele.value;
        this.data.placeholder['index'] = ele.index;
      })
    } else {
      Object.assign(this.data, { finalAnswer: [] });
      this.data.placeholder.forEach((ele: any, ind: number) => {
        ele['value'] = '';
        ele['index'] = ind;
      })

    }


  }

  placeholderChange(data: any) {

    let ans = this.data.finalAnswer.findIndex((v: any) => v.index == data.index);
    if (ans > -1) {

      this.data.finalAnswer[ans] = { value: data.value, index: data.index,placeholder :data.placeholder };

    } else {
      this.data.finalAnswer.push({ value: data.value, index: data.index ,placeholder :data.placeholder });
    }

  }
}
