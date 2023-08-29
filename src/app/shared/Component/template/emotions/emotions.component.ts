import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-emotions',
  templateUrl: './emotions.component.html',
  styleUrls: ['./emotions.component.css']
})
export class EmotionsComponent implements OnInit {
  @Input() data: any = null;
  @Input() viewMode:any = null;

  value: any

  emotionRadioList: any = [
    {
      value: 'Respect',
      checked: false
    },
    {
      value: 'Pity',
      checked: false
    },
    {
      value: 'Love',
      checked: false
    },
    {
      value: 'Joy',
      checked: false
    },
    {
      value: 'Hope',
      checked: false
    },
    {
      value: 'Gratitude',
      checked: false
    },
    {
      value: 'Freedom',
      checked: false
    },
    {
      value: 'Faith',
      checked: false
    },
    {
      value: 'Empathy',
      checked: false
    },
    {
      value: 'Courage',
      checked: false
    },
    {
      value: 'Anger',
      checked: false
    },
    {
      value: 'Apathy',
      checked: false
    },
    {
      value: 'Conceit',
      checked: false
    },
    {
      value: 'Despair',
      checked: false
    },
    {
      value: 'Doubt',
      checked: false
    },
    {
      value: 'Envy',
      checked: false
    },
    {
      value: 'Fear',
      checked: false
    },
    {
      value: 'Greed',
      checked: false
    },

    {
      value: 'Guilt',
      checked: false
    },
    {
      value: 'Hate',
      checked: false
    }
  ]

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {


    this.emotionRadioList.forEach((ele: any) => {
      ele['checked'] = false;
      if (ele.value == this.data.finalAnswer) {

        this.value = this.data.finalAnswer
        ele['checked'] = true;
      }
    })


  }
  change(event: any, data: any) {

    this.value = data
    if (event.target.checked) {
      this.data['finalAnswer'] = data
    }

  }
  calculate(){
    this.commonService.calculateEmotion(true)
  }
  selectEmotion(){
    this.commonService.selectEmotion(true)
  }
}
