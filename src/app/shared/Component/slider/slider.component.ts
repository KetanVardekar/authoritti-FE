import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() data: any = null;
  @Input() index: number = 0;
  options: Options = {
    showTicksValues: true,
    showSelectionBar: true,
    stepsArray: []
  };
  @Input() viewMode:any = null;
  constructor() { }

  ngOnInit(): void {

    this.options.disabled = this.viewMode ? true : false;

    let counter = this.data.minVal;
    this.data.tag.forEach((ele: any) => {
      if (counter == this.data.minVal) {
        this.options.stepsArray?.push({ value: counter, legend: this.data.minValLabel ? this.data.minValLabel : ele })
      } else if (counter == this.data.maxVal) {
        this.options.stepsArray?.push({ value: counter, legend: this.data.maxValLabel ? this.data.maxValLabel : ele })
      } else {
        this.options.stepsArray?.push({ value: counter, legend: ele })
      }

      counter++;

    })

    if (this.data.finalAnswer) {
      this.data['finalAnswer'] = this.data.finalAnswer;
    } else {

      if (this.data.defaultAnswer != null) {

        let obj = this.options.stepsArray?.find(v => v.value == this.data.defaultAnswer);
        if (obj) {
          this.data['finalAnswer'] = obj;
        } else {
          this.data['finalAnswer'] = this.options.stepsArray?.shift();
        }

      } else {
        this.data['finalAnswer'] = this.options.stepsArray?.shift();
      }

    }


  }

  formStructure(event: any) {

    let obj = this.options.stepsArray?.find(v => v.value == event);
    if (obj) {
      this.data.finalAnswer = obj;
    }
  }
}
