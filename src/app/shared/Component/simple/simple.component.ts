import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit, OnDestroy {
  @Input() data: any = null;
  @Input() reportData: any = null
  @Input() reportType: any = null;
  @Input() updatedAt = null;
  @Input() appUpdatedOn:any = null;
  finalQuestionList: any
  datas: any;
  appTitle: any;
  appId: any
  doc: any;
  appUpdatedAt: any;
  userData: any;
  report: any;
  pageData: any;
  emotionValue: any = '';
  groupData: any = {};
  groups: any = {};
  questionerDynamicGroup: any = {};
  categoryName: any;
  categoryValue: any;
  sortedCategoryName: any = [];
  sortedCategoryScore: any = [];
  elementOfObj: any;
  array: any = [];
  mainCategoryHeading: any;
  quesDynamic: any;

  positiveEmotions = [
    { name: "Respect", value: 10 },
    { name: "Pity", value: 9 },
    { name: "Love", value: 8 },
    { name: "Joy", value: 7 },
    { name: "Hope", value: 6 },
    { name: "Gratitude", value: 5 },
    { name: "Freedom", value: 4 },
    { name: "Faith", value: 3 },
    { name: "Empathy", value: 2 },
    { name: "Courage", value: 1 }
  ];


  negativeEmotions = [
    { name: "Anger", value: -1 },
    { name: "Apathy", value: -2 },
    { name: "Conceit", value: -3 },
    { name: "Despair", value: -4 },
    { name: "Doubt", value: -5 },
    { name: "Envy", value: -6 },
    { name: "Fear", value: -7 },
    { name: "Greed", value: -8 },
    { name: "Guilt", value: -9 },
    { name: "Hate", value: -10 }
  ];

  printSubscription: Subscription = new Subscription();
  constructor(private commonService: CommonService,
    private route: ActivatedRoute,
    private appService: AppService,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.loader.start();
    if(this.appUpdatedOn){
      this.updatedAt = this.appUpdatedOn;
    }


    if (this.reportType == 'emotions') {

      let temp: any = [];
      let ques = this.data.filter((ele: any) => {
        return ele.questioner
      })
      ques.forEach((res: any) => {
        res.questioner.questions.forEach((element: any) => {
          let data = element
          temp.push(data)
        })
      })

      this.finalQuestionList = temp;

      let template = this.data.find((ele: any) => {
        if (ele.custom_template) {
          if (ele?.custom_template?.name == 'emotions') {
            return ele.custom_template
          }
        }
      })

      this.emotionValue = template?.custom_template?.finalAnswer;

      if (!this.emotionValue) {
        let templateIndex = this.data.findIndex((v: any) => v.custom_template?.name == 'emotions');
        if (templateIndex > -1) {

          let posEmotionPage = this.data[templateIndex + 1];
          let negEmotionPage = this.data[templateIndex + 2];

          let posTotal = 0;
          let negTotal = 0;
          if (posEmotionPage?.questioner) {
            if (posEmotionPage?.questioner?.questions && posEmotionPage?.questioner?.questions?.length) {
              posEmotionPage?.questioner?.questions.forEach((element: any) => {
                if (element?.id?.question?.slider?.finalAnswer?.value) {
                  posTotal = posTotal + element?.id?.question?.slider?.finalAnswer?.value;
                } else {
                  posTotal = posTotal + 0;
                }
              });
            }
          }

          if (negEmotionPage?.questioner) {
            if (negEmotionPage?.questioner?.questions && negEmotionPage?.questioner?.questions?.length) {
              negEmotionPage?.questioner?.questions.forEach((element: any) => {
                if (element?.id?.question?.slider?.finalAnswer?.value) {
                  negTotal = negTotal + element?.id?.question?.slider?.finalAnswer?.value;
                } else {
                  negTotal = negTotal + 0;
                }
              });
            }
          }

          let finalResult = posTotal - negTotal;

          if (finalResult > 0 && finalResult<=10) {
            let emotion = this.positiveEmotions.find(v => v.value == finalResult);
            this.emotionValue = emotion?.name;
          } else if (finalResult < 0 && finalResult>=-10) {
            let emotion = this.negativeEmotions.find(v => v.value == finalResult);
            this.emotionValue = emotion?.name;
          } else if(finalResult == 0) {
            this.emotionValue = 'Pride';
          }else{
            this.emotionValue = 'No Emotion Matched';
          }
        }
      }


    }



    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);

    this.route.params.subscribe((res: any) => {

      this.appId = res.appId
    })

    this.appService.getAppById(this.appId).subscribe((res: any) => {

      this.appTitle = res.data.title
      this.appUpdatedAt = res.data.updatedAt
    })

    this.printSubscription = this.commonService.printReport.subscribe((res: any) => {

      document.getElementById("print")?.click();
      // this.printSubscription.unsubscribe();

    })

    // Natural Gifts Report Type Code

    if (this.reportType == 'naturalGifts' || this.reportType == 'simple') {

      this.report = this.reportData.filter((ele: any) => ele.questioner)

      this.report.forEach((ele: any) => {

        if (ele?.questioner?.categories) {
          if (this.groupData[ele.questioner?.categories?.name] && this.groupData[ele?.questioner?.categories?.name].length) {

            this.groupData[ele?.questioner?.categories?.name] = [...this.groupData[ele?.questioner?.categories?.name], ...ele.questioner.questions]

          } else {
            this.groupData[ele?.questioner?.categories?.name] = ele?.questioner?.questions;
          }
        }
      })


      let sortedData: any = [];
      for (let ele in this.groupData) {

        this.elementOfObj = this.groupData[ele]

        let value = 0;
        for (let element of this.elementOfObj) {

          if (element?.id?.question?.slider?.finalAnswer?.value) {
            value = value + element.id.question.slider.finalAnswer.value
          }

        }

        if(value >= 1){
          sortedData.push({ 'name': ele, 'score': value });
        }

      }
      this.mainCategoryHeading = sortedData;

      this.mainCategoryHeading.sort((a: any, b: any) => parseFloat(b.score) - parseFloat(a.score));

      // -------Groups-------
      this.report = this.reportData.filter((ele: any) => ele.questioner)
      this.report.forEach((ele: any) => {
        if (ele.questioner.group) {
          if (this.groups[ele.questioner?.group?.title] && this.groups[ele?.questioner?.group?.title].length) {
            this.groups[ele?.questioner?.group?.title] = [...this.groups[ele?.questioner?.group?.title], ...ele.questioner.questions]
          } else {
            this.groups[ele?.questioner?.group?.title] = ele?.questioner?.questions;
          }
        }
      })


    }


    // ------Questioner Dynamic-----------
    this.quesDynamic = this.reportData.filter((ele: any) => ele.dynamic_question)

    this.quesDynamic.forEach((ele: any) => {

      if (ele?.dynamic_question?.group) {
        if (this.questionerDynamicGroup[ele.dynamic_question?.group?.title] && this.questionerDynamicGroup[ele?.dynamic_question?.group?.title].length) {
          this.questionerDynamicGroup[ele?.dynamic_question?.group?.title] = [...this.questionerDynamicGroup[ele?.dynamic_question?.group?.title], ...[ele.dynamic_question.template]]
        } else {
          this.questionerDynamicGroup[ele?.dynamic_question?.group?.title] = [ele.dynamic_question.template];
        }
      }
    })

this.loader.stop();
  }

  ngOnDestroy(): void {
    this.printSubscription.unsubscribe();
  }

}
