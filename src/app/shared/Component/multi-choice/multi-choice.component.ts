import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.css']
})
export class MultiChoiceComponent implements OnInit {
  @Input() data: any = null;
  @Input() index:number = 0;
  @Input() viewMode:any = null;
  multiChoiceSelected :any
  options: any = [];

  constructor(private toaster: ToastrService,
    private changedetect: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.data.finalAnswer && this.data.finalAnswer.length) {
      this.data.options.forEach((ele: any, index: number) => {
        this.options.push({ key: index, value: ele })
      })
      this.options.forEach((ele: any) => {
        ele['checked'] = false;
        if(this.data.finalAnswer.includes(ele.value)){
          ele['checked'] = true;
        }
      });

    } else {
      Object.assign(this.data, { finalAnswer: [] ,sendToDynamic:[] })

      this.data.options.forEach((ele: any, index: number) => {
        this.options.push({ key: index, value: ele })
      })
      this.options.forEach((ele: any) => {
        ele['checked'] = false
      })
    }

  }
  multiChoiceCheckbox(event: any, data: any, i: number) {
if (event.target.checked) {

      if(this.data.maxAnswerCount == 0){
        this.data.finalAnswer.push(data.value)
        this.data.sendToDynamic.push(data.value)

      } else{
        if (this.data.finalAnswer.length + 1 <= this.data.maxAnswerCount) {
          this.data.finalAnswer.push(data.value);
          this.data.sendToDynamic.push(data.value)

          this.multiChoiceSelected = this.data.sendToDynamic;
        } else {
          this.toaster.warning('Exceeded Max Answer Count');
          data.checked = false;
          event.target.checked = false;
          this.changedetect.detectChanges();
        }
      }
    } else {

      let index =  this.data.finalAnswer.indexOf(data.value)
     this.data.finalAnswer.splice(index, 1);

      this.data.sendToDynamic.splice(index, 1)

      data.checked = false;
      event.target.checked = false;
      this.changedetect.detectChanges();

    }

  }

}
