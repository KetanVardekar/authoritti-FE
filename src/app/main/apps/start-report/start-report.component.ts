import { Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppService } from 'src/app/shared/services/app.service';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-start-report',
  templateUrl: './start-report.component.html',
  styleUrls: ['./start-report.component.css']
})
export class StartReportComponent implements OnInit, OnDestroy {
  appId: any;
  id: any = null;
  pageData: any;
  // pageData:any;
  currentIndex = 0;
  nextButton = true;
  activePage: any = null;
  showSidebar = false;
  submitFlag = false;
  previousFlag = false;
  printReportFlag: boolean = false;
  emotionFlag: boolean = false;
  reportName: any;
  multiColFlag: any = {};
  pageDataList: any;
  reportList: any;
  appTitle: any;
  reportType: any;
  addedReport: any;
  createdAt: any;
  professionData: any;
  introData: any;
  editFlag = false;
  copyofPageData: any;
  copyofProfessionData: any;

  passionData: any
  filteredArray: any = [];
  passionFilteredArray: any = [];
  sideBarSubscription: Subscription = new Subscription();
  calculatedSubscription: Subscription = new Subscription();
  selectedSubscription: Subscription = new Subscription();
  professsionValueSubscription: Subscription = new Subscription();
  constructor(private router: Router,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private appService: AppService,
    private appsListService: AppListService,
    private route: ActivatedRoute,
    private changedetect: ChangeDetectorRef,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.route.url.subscribe((url: any) => {

      if (url[3].path == 'edit') {
        this.editFlag = true;
      } else {
        this.editFlag = false;
      }
    })

    this.route.params.subscribe((params: any) => {
      if (params) {

        this.appId = params.appId;
        this.reportName = params.reportName

        if (params.id) {

          this.id = params.id;
          this.getReportData();
        } else {
          this.getAppById();
        }
      }
    });

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;

    });
    this.calculatedSubscription = this.commonService.calculated.subscribe((res: any) => {
      if (res == true) {
        this.nextButton = true;
        this.nextPage(null, true);
      }
    })
    this.selectedSubscription = this.commonService.selected.subscribe((res: any) => {
      if (res == true) {
        this.nextButton = true;
        this.nextPage(true);
      }
    })
    this.professsionValueSubscription = this.commonService.professsionValue.subscribe((res: any) => {
      this.professionData = res
    })
  }
  getReportData() {
    this.loader.start();
    this.appsListService.getReportById(this.id).subscribe((res: any) => {
      this.pageData = res.data[0].answers_obj;
      this.reportName = res.data[0].name;
      this.reportType = res.data[0].reportType;
this.copyofPageData = [...this.pageData];
      let index = this.copyofPageData.findIndex((ele: any) => ele.report);
      this.copyofPageData.splice(index, 1);

      //For Hiding The Next Button if Emotion Template is there on the page
      if (this.pageData[this.currentIndex]?.custom_template?.name === 'emotions') {
        this.nextButton = false;
      } else {
        this.nextButton = true;
      }
      // --------------------------------------------
      // if(this.pageData[this.currentIndex].custom_template?.name === 'profession'){
      //   this.pageData = [...passionData]
      // }
      //For Intro Functionality
      let intro = this.pageData.find((ele: any) => ele?.intro?.videolink)
      if (intro?.intro?.icon === 'true') {
        let index = this.pageData.findIndex((ele: any) => ele?.intro?.videolink)
        this.pageData.splice(index, 1)
      }
      this.introData = intro?.intro?.icon
      // ----------------------

      this.commonService.setMainTitleToggle(res.data[0].name);
      let multiCol = this.pageData.filter((ele: any) => {
        return ele.questioner
      })
      multiCol.filter((ele: any) => {
        this.multiColFlag[ele._id] = ele.questioner.multiColLayout
      })
      if (this.pageData && this.pageData.length) {
        this.alterIdAndSequenceObjectForReport();
      }
    })

  }

  reportData: any = null;
  alterIdAndSequenceObjectForReport() {

    this.reportData = this.pageData.filter((ele: any) => {

      let keys = Object.keys(ele);

      let index = keys.indexOf("_id");
      keys.splice(index, 1);
      if (keys.length > 1) {
        let finalIndex = keys.indexOf("sequence")
        keys.splice(finalIndex, 1);
      } else {
        keys = keys;
      }
      if (keys[0] == 'report') {
        return true;
      } else {
        return false;
      }
    });

    if (this.reportData && this.reportData.length) {
      this.reportType = this.reportData[0].report.type;
    }


    let exceptReportData = this.pageData.filter((ele: any) => {
      let keys = Object.keys(ele);

      let index = keys.indexOf("_id");
      keys.splice(index, 1);

      if (keys.length > 1) {
        let finalIndex = keys.indexOf("sequence")
        keys.splice(finalIndex, 1);
      } else {
        keys = keys;
      }

      if (keys[0] !== 'report') {
        return true;
      } else {
        return false;
      }
    });


    this.pageData = [...exceptReportData];


    this.pageData = this.pageData.filter((ele: any) => {

      let keys = Object.keys(ele);

      let index = keys.indexOf("_id");
      keys.splice(index, 1);
      if (keys.length > 1) {
        let finalIndex = keys.indexOf("sequence")
        keys.splice(finalIndex, 1);

      } else {
        keys = keys;

      }
      if (ele[keys[0]].active) {
        return true;
      } else {
        return false;
      }

    })

    if (this.pageData && this.pageData.length) {
      let keys = Object.keys(this.pageData[0]);


      let index = keys.indexOf("_id");
      keys.splice(index, 1);
      if (keys.length > 1) {
        let finalIndex = keys.indexOf("sequence")
        keys.splice(finalIndex, 1);
      } else {
        keys = keys;
      }
      this.activePage = this.pageData[0];
      this.loader.stop();
    } else {
      this.toaster.warning('No Active Pages')
      this.loader.stop();
    }

    // this.pageData = [...this.pageData];
  }

  getAppById() {

    this.loader.start();
    this.appService.getAppById(this.appId).subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.pageData = res.data.page;

        let intro = this.pageData.find((ele: any) => ele?.intro?.videolink)
        if (intro?.intro?.icon === true || intro?.intro?.icon === 'true') {
          let index = this.pageData.findIndex((ele: any) => ele?.intro?.videolink)
          this.pageData.splice(index, 1)
        }
        this.introData = intro?.intro?.icon
        // ----------------------

        this.commonService.setMainTitleToggle(this.reportName);
        let multiCol = this.pageData.filter((ele: any) => {
          return ele.questioner
        })
        multiCol.filter((ele: any) => {
          this.multiColFlag[ele._id] = ele.questioner.multiColLayout
        })
        if (this.pageData && this.pageData.length) {
          this.alterIdAndSequenceObjectForReport();
        }


        this.copyofPageData = [...this.pageData];
        // let index = this.copyofPageData.findIndex((ele: any) => ele.report);
        // this.copyofPageData.splice(index, 1);

        //For Hiding The Next Button if Emotion Template is there on the page
        if (this.pageData[this.currentIndex]?.custom_template?.name === 'emotions') {
          this.nextButton = false;
        } else {
          this.nextButton = true;
        }
        // --------------------------------------------
        // if(this.pageData[this.currentIndex].custom_template?.name === 'profession'){
        //   this.pageData = [...passionData]
        // }
        //For Intro Functionality


      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    });

  }


  nextPage(fromEmotion?: any, fromCalculate?: any) {
    // For Removing pages when a profession is deleted

    if (this.pageData[this.currentIndex].custom_template?.name === 'profession') {

      if (!this.id)
        this.pageData = [...this.copyofPageData]
    }


    if (this.pageData[this.currentIndex].custom_template?.name === 'passion') {

      if (!this.id)
        this.pageData = [...this.copyofProfessionData]
    }

    // -----

    if (this.pageData[this.currentIndex] && this.pageData[this.currentIndex].custom_template?.name === 'profession') {
      let professionData = this.pageData.find((ele: any) => ele?.custom_template?.name === 'profession')
      if (professionData.custom_template?.name === 'profession') {

        var indexofTemplate = this.pageData.findIndex((ele: any) => ele?.custom_template?.name === 'profession')
        this.filteredArray = []
        for (let i = indexofTemplate + 1; i <= this.pageData.length; i++) {
          if (this.pageData[i] !== undefined) {
            if (this.pageData[i].questioner?.tag == "tableSkill" || this.pageData[i].questioner?.tag == "tableTrait") {

              let exist = this.filteredArray.find((v: any) => v._id == this.pageData[i]._id);
              if (!exist) {
                this.filteredArray.push(this.pageData[i])
              }

            } else if (this.pageData[i].dynamic_question || this.pageData[i].intro || this.pageData[i].section || this.pageData[i].report || this.pageData[i].custom_template) {
              break;
            }

          }
        }
      }

      if (professionData?.custom_template?.finalAnswer && professionData?.custom_template?.finalAnswer.length > 1) {

        if (this.filteredArray && this.filteredArray.length) {

          for (let i = indexofTemplate + 1; i <= this.pageData.length; i++) {
            if (this.pageData[i] !== undefined) {
              if (this.pageData[i].questioner?.tag == "tableSkill" || this.pageData[i].questioner?.tag == "tableTrait") {

                this.pageData.splice(i,1);
                i--;

              } else if (this.pageData[i].dynamic_question || this.pageData[i].intro || this.pageData[i].section || this.pageData[i].report || this.pageData[i].custom_template) {
                break;
              }

            }
          }

          let resullt: any = [];
          professionData?.custom_template?.finalAnswer.forEach((ele: any, index: any) => {
            this.filteredArray.forEach((val: any) => {
              let obj = JSON.parse(JSON.stringify(val));
              obj.questioner['templateTitle'] = "Job #" + (index + 1) + " " + ele['jobTitle'] + "/" +
                ele['companyName'] + " | Year " + ele['year'];
              obj.questioner['professionTemplate'] = true;
              obj.questioner['passionTemplate'] = false;
              resullt.push(obj);
            });
          })
          if (resullt && resullt.length) {

            this.pageData.splice(indexofTemplate + 1, 0, ...resullt);

            this.copyofProfessionData = this.pageData;
          }
        }
      } else if (professionData?.custom_template?.finalAnswer && professionData?.custom_template?.finalAnswer.length == 1) {

        for (let i = indexofTemplate + 1; i <= this.pageData.length; i++) {
          if (this.pageData[i] !== undefined) {
            if (this.pageData[i].questioner?.tag == "tableSkill" || this.pageData[i].questioner?.tag == "tableTrait") {

              this.pageData.splice(i,1);
              i--;

            } else if (this.pageData[i].dynamic_question || this.pageData[i].intro || this.pageData[i].section || this.pageData[i].report || this.pageData[i].custom_template) {
              break;
            }

          }
        }

        const ele = professionData?.custom_template?.finalAnswer[0]
        this.filteredArray.forEach((val1: any) => {
          val1.questioner['templateTitle'] = "Job #1" + " " + ele['jobTitle'] + "/" +
            ele['companyName'] + " | Year " + ele['year'];
          val1.questioner['professionTemplate'] = true;
          val1.questioner['passionTemplate'] = false;
        });


        this.pageData.splice(indexofTemplate + 1, 0, ...this.filteredArray);
        this.copyofProfessionData = this.pageData;
        // this.pageData.splice(indexofTemplate + 1, 0, ...this.filteredArray);

      } else {
        this.toaster.warning("Enter all fields");
        return;
      }


    }

    if (this.pageData[this.currentIndex] && this.pageData[this.currentIndex].custom_template?.name === 'passion') {
      let passionData = this.pageData.find((ele: any) => ele?.custom_template?.name === 'passion');

      if (passionData.custom_template?.name === 'passion') {

        var indexofPassionTemplate = this.pageData.findIndex((ele: any) => ele?.custom_template?.name === 'passion')

        this.passionFilteredArray = []
        for (let i = indexofPassionTemplate + 1; i <= this.pageData.length; i++) {
          if (this.pageData[i] !== undefined) {
            if (this.pageData[i].questioner?.tag == "tableSkill" || this.pageData[i].questioner?.tag == "tableTrait") {
              let exist = this.passionFilteredArray.find((v: any) => v._id == this.pageData[i]._id);
              if (!exist) {
                this.passionFilteredArray.push(this.pageData[i])
              }

            } else if (this.pageData[i].dynamic_question || this.pageData[i].intro || this.pageData[i].section || this.pageData[i].report || this.pageData[i].custom_template) {
              break;
            }

          }
        }

      }

      if (passionData?.custom_template?.finalAnswer && passionData?.custom_template?.finalAnswer.length > 1) {
        if (this.passionFilteredArray && this.passionFilteredArray.length) {

          for (let i = indexofPassionTemplate + 1; i <= this.pageData.length; i++) {
            if (this.pageData[i] !== undefined) {
              if (this.pageData[i].questioner?.tag == "tableSkill" || this.pageData[i].questioner?.tag == "tableTrait") {

                this.pageData.splice(i,1);
                i--;

              } else if (this.pageData[i].dynamic_question || this.pageData[i].intro || this.pageData[i].section || this.pageData[i].report || this.pageData[i].custom_template) {
                break;
              }

            }
          }

          let passionResullt: any = [];

          passionData?.custom_template?.finalAnswer.forEach((ele: any, index: any) => {

            this.passionFilteredArray.forEach((val: any) => {

              let obj = JSON.parse(JSON.stringify(val));

              if (obj.questioner.tag == "tableSkill") {

                obj.questioner['passionTitle'] = ele['name'] + "- " + obj.questioner['title'];
                obj.questioner['professionTemplate'] = false;
                obj.questioner['passionTemplate'] = true;
              } else if (obj.questioner.tag == "tableTrait") {
                // obj.questioner['finalAnswer'] = [];
                obj.questioner['passionTitle'] = ele['name'] + "- " + obj.questioner['title'];
                obj.questioner['professionTemplate'] = false;
                obj.questioner['passionTemplate'] = true;
              }
              passionResullt.push(obj);
            });
          })

          if (passionResullt && passionResullt.length) {

            this.pageData.splice(indexofPassionTemplate + 1, 0, ...passionResullt);

          }

        }
      } else if (passionData?.custom_template?.finalAnswer && passionData?.custom_template?.finalAnswer.length == 1) {
        for (let i = indexofPassionTemplate  + 1; i <= this.pageData.length; i++) {
          if (this.pageData[i] !== undefined) {
            if (this.pageData[i].questioner?.tag == "tableSkill" || this.pageData[i].questioner?.tag == "tableTrait") {

              this.pageData.splice(i,1);
              i--;

            } else if (this.pageData[i].dynamic_question || this.pageData[i].intro || this.pageData[i].section || this.pageData[i].report || this.pageData[i].custom_template) {
              break;
            }

          }
        }
        const element = passionData?.custom_template?.finalAnswer[0]

        this.passionFilteredArray.forEach((val1: any) => {

          if (val1.questioner.tag == "tableSkill") {
            val1.questioner['passionTitle'] = element['name'] + "- " + val1.questioner['title'];
            val1.questioner['professionTemplate'] = false;
            val1.questioner['passionTemplate'] = true;
          } else if (val1.questioner.tag == "tableTrait") {
            val1.questioner['passionTitle'] = element['name'] + "- " + val1.questioner['title'];
            val1.questioner['professionTemplate'] = false;
            val1.questioner['passionTemplate'] = true;
          }
        });

        // this.pageData.splice(indexofPassionTemplate + 1, 0, ...this.passionFilteredArray);
        this.pageData.splice(indexofPassionTemplate + 1, 0, ...this.passionFilteredArray);

      } else {
        this.toaster.warning("Enter all fields");
        return;
      }

      this.pageData = [...this.pageData];
    }

    if (fromEmotion) {
      this.currentIndex = this.currentIndex + 3;
    } else if (fromCalculate) {
      this.currentIndex++;
      let indexofEmotion = this.pageData.findIndex((ele: any) => ele?.custom_template?.name === 'emotions');
      if (indexofEmotion > -1) {
        this.pageData[indexofEmotion].custom_template.finalAnswer = null;
      }
    } else {
      this.currentIndex++;
    }

    // this.pageData = [...this.pageData];

    let keys = Object.keys(this.pageData[this.currentIndex]);
    let index = keys.indexOf("_id");
    keys.splice(index, 1);
    if (keys.length > 1) {
      let finalIndex = keys.indexOf("sequence")
      keys.splice(finalIndex, 1);
    } else {
      keys = keys;
    }

    this.activePage = this.reportData[0];
    this.changedetect.detectChanges();

    this.activePage = this.pageData[this.currentIndex];

    if ((this.pageData.length - this.currentIndex) == 1) {
      this.previousFlag = true
    }
    this.submitFlag = false;

    this.changedetect.detectChanges();


  }

  previousPage() {


    // if (this.pageData[this.currentIndex] && !this.id) {

    //   if (this.pageData[this.currentIndex].questioner) {

    //     if (this.pageData[this.currentIndex].questioner.questions && this.pageData[this.currentIndex].questioner.questions.length) {

    //       this.pageData[this.currentIndex].questioner.questions.forEach((element: any) => {

    //         if (element?.id?.question?.slider) {
    //           element.id.question.slider['finalAnswer'] = [];
    //           delete element.id.question.slider['finalAnswer'];
    //         } else if (element?.id?.question?.multipleChoice) {
    //           element.id.question.multipleChoice['finalAnswer'] = [];
    //           delete element.id.question.multipleChoice['finalAnswer'];
    //         } else if (element?.id?.question?.multiTextInput) {
    //           element.id.question.multiTextInput['finalAnswer'] = [];
    //           delete element.id.question.multiTextInput['finalAnswer'];
    //         } else if (element?.id?.question?.singleChoice) {
    //           element.id.question.singleChoice['finalAnswer'] = "";
    //           delete element.id.question.singleChoice['finalAnswer'];
    //         } else if (element?.id?.question?.textArea) {
    //           element.id.question.textArea['finalAnswer'] = "";
    //           delete element.id.question.textArea['finalAnswer'];
    //         } else if (element?.id?.question?.textInput) {
    //           element.id.question.textInput['finalAnswer'] = "";
    //           delete element.id.question.textInput['finalAnswer'];
    //         }

    //       });
    //     }

    //   } else if (this.pageData[this.currentIndex].custom_template) {

    //     if (this.pageData[this.currentIndex].custom_template.name == 'emotions') {
    //       this.pageData[this.currentIndex].custom_template['finalAnswer'] = "";
    //       delete this.pageData[this.currentIndex].custom_template['finalAnswer'];
    //     } else {
    //       this.pageData[this.currentIndex].custom_template['finalAnswer'] = [];
    //       delete this.pageData[this.currentIndex].custom_template['finalAnswer'];
    //     }


    //   } else if (this.pageData[this.currentIndex].dynamic_question) {

    //     let element = this.pageData[this.currentIndex].dynamic_question;
    //     if (element.template.template.slider) {
    //       element.template.template.slider['finalAnswer'] = [];
    //       delete element.template.template.slider['finalAnswer'];
    //     } else if (element.template.template.multipleChoice) {
    //       element.template.template.multipleChoice['finalAnswer'] = [];
    //       delete element.template.template.multipleChoice['finalAnswer']
    //     } else if (element.template.template.tableDropDown) {
    //       element.template.template.tableDropDown['finalAnswer'] = [];
    //       delete element.template.template.tableDropDown['finalAnswer']
    //     } else if (element.template.template.tableSkill) {
    //       element.template.template.tableSkill['finalAnswer'] = [];
    //       delete element.template.template.tableSkill['finalAnswer']
    //     } else if (element.template.template.tableTrait) {
    //       element.template.template.tableTrait['finalAnswer'] = [];
    //       delete element.template.template.tableTrait['finalAnswer']
    //     } else if (element.template.template.tableYesNo) {
    //       element.template.template.tableYesNo['finalAnswer'] = [];
    //       delete element.template.template.tableYesNo['finalAnswer']
    //     } else if (element.template.template.tableSkillTrait) {
    //       element.template.template.tableSkillTrait['skillsFinalAnswer'] = [];
    //       element.template.template.tableSkillTrait['traitsFinalAnswer'] = [];
    //       delete element.template.template.tableSkillTrait['skillsFinalAnswer'];
    //       delete element.template.template.tableSkillTrait['traitsFinalAnswer'];
    //     }

    //   }
    // }

    if (this.pageData[this.currentIndex - 3]) {
      if (this.pageData[this.currentIndex - 3].custom_template?.name === 'emotions') {
        this.nextButton = false;
        let index = this.pageData.findIndex((v: any) => v.custom_template?.name === 'emotions');
        if (index > -1) {
          this.currentIndex = index;
        } else {
          this.currentIndex--;
        }
      } else {
        this.currentIndex--;
      }
    } else {
      this.currentIndex--;
    }

    let keys = Object.keys(this.pageData[this.currentIndex]);
    let index = keys.indexOf("_id");
    keys.splice(index, 1);
    if (keys.length > 1) {
      let finalIndex = keys.indexOf("sequence")
      keys.splice(finalIndex, 1);
    } else {
      keys = keys;
    }

    this.activePage = this.reportData[0];
    this.changedetect.detectChanges();
    this.activePage = this.pageData[this.currentIndex];

    this.submitFlag = false;


    this.changedetect.detectChanges();
  }

  submitAllPageData() {

    this.submitFlag = true;
    this.previousFlag = false;

    this.currentIndex++;

    this.pageData.push(...this.reportData)
    this.loader.start();
    let payload = {

      name: this.reportName,
      reportType: this.reportType,
      answers_obj: this.pageData,
      application_id: this.appId
    }
    this.appsListService.addReport(payload).subscribe((res: any) => {

      if (res.statusCode == 200) {

        this.createdAt = res.data.updatedAt;

        this.printReportFlag = true;
        this.commonService.setHomeIconToggle({ showIcon: true, appId: this.appId });
        this.addedReport = res.data.answers_obj;

        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }

    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    })

  }
  submitPage() {
    this.loader.start();
    let payload = {
      name: this.reportName
    }
    this.appsListService.checkUniqueName(this.appId, payload).subscribe((res: any) => {
      if (res.data == true) {
        this.toaster.error(res.message);
        this.loader.stop();
      } else {
        this.submitAllPageData();
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    })

  }
  updatePage() {
    this.loader.start();
    this.submitFlag = true;
    this.previousFlag = false;
    let payload = {
      name: this.reportName,
      reportType: this.reportType,
      answers_obj: this.pageData,
      application_id: this.appId
    }
    this.appsListService.updateReport(this.id, payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.printReportFlag = true;
        this.commonService.setHomeIconToggle({ showIcon: true, appId: this.appId });
        this.addedReport = res.data.answers_obj;
        this.createdAt = res.data.updatedAt;
        this.changedetect.detectChanges();
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    })
  }
  PrintReport() {
    this.commonService.setPrintReport(true)
  }

  setActivePage(event: any) {
    this.activePage = this.pageData[event];
    this.currentIndex = event;
    this.changedetect.detectChanges();
  }

  ngOnDestroy(): void {
    this.commonService.setHomeIconToggle({ showIcon: false, appId: this.appId });
    this.commonService.setPrintReport(false);

    this.sideBarSubscription.unsubscribe();
    this.calculatedSubscription.unsubscribe();
    this.professsionValueSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
  }
}
