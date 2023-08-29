import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { multipleChoice, multiTextInput, PlaceHolderClass, singleChoice, slider, textArea, textInput } from 'src/app/shared/models/pages';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.css']
})
export class AddEditQuestionComponent implements OnInit {
  multipleChoicePayload: multipleChoice = new multipleChoice();
  multiTextPayload: multiTextInput = new multiTextInput();
  singleChoicePayload: singleChoice = new singleChoice();
  sliderPayload: slider = new slider();
  textAreaPayload: textArea = new textArea();
  textInputPayload: textInput = new textInput();
  selectedQuestionType: any
  selectedType: any;
  appId: any;
  id: any;
  questionId: any
  selectedOption: any;
  tagList: any
  mcqOptionsList: any
  singleChoice: any
  singleChoiceList: any = [];
  sliderTagList: any = [];
  title = '';
  formSubmiited = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private appsListService: AppListService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.title = 'Add Question';
    this.route.params.subscribe((params: any) => {

      if (params) {
        this.appId = params.appId;

        this.id = params.pageId;

        if (params.id) {
          this.questionId = params.id;
          this.title = 'Edit Question';
          this.getQuestion()
        }
      }
    });

    this.commonService.setMainTitleToggle(this.title);
  }

  cancel() {
    this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
  }

  addPlaceholder() {
    this.multiTextPayload.placeholder.push(new PlaceHolderClass());
  }

  removePlaceholder(i: any) {
    this.multiTextPayload.placeholder.splice(i, 1);
    if (this.multiTextPayload.placeholder.length == 0) {
      this.multiTextPayload.placeholder.push(new PlaceHolderClass());
    }
  }

  getQuestion() {

    this.loader.start();
    this.appsListService.getQuestionById(this.appId, this.questionId).subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.selectedOption = Object.keys(res.data.question);
        this.selectedType = this.selectedOption[0];
        if (this.selectedType === 'multipleChoice') {
          this.multipleChoicePayload.title = res.data.question.multipleChoice.title;
          this.multipleChoicePayload.description = res.data.question.multipleChoice.description;
          this.multipleChoicePayload.divideInGroups = res.data.question.multipleChoice.divideInGroups;
          this.multipleChoicePayload.maxAnswerCount = res.data.question.multipleChoice.maxAnswerCount;
          this.multipleChoicePayload.options = res.data.question.multipleChoice.options;
        } else if (this.selectedType === 'multiTextInput') {

          this.multiTextPayload.title = res.data.question.multiTextInput.title;
          this.multiTextPayload.description = res.data.question.multiTextInput.description;
          this.multiTextPayload.placeholder = res.data.question.multiTextInput.placeholder;
        }
        else if (this.selectedType === 'singleChoice') {

          this.singleChoicePayload.title = res.data.question.singleChoice.title;
          this.singleChoicePayload.description = res.data.question.singleChoice.description;
          this.singleChoicePayload.other = res.data.question.singleChoice.other;
          this.singleChoicePayload.options = res.data.question.singleChoice.options;
        } else if (this.selectedType === 'slider') {
          this.sliderPayload.title = res.data.question.slider.title;
          this.sliderPayload.description = res.data.question.slider.description;
          this.sliderPayload.minVal = res.data.question.slider.minVal;
          this.sliderPayload.maxVal = res.data.question.slider.maxVal;
          this.sliderPayload.defaultAnswer = res.data.question.slider.defaultAnswer;
          this.sliderPayload.minValLabel = res.data.question.slider.minValLabel;
          this.sliderPayload.maxValLabel = res.data.question.slider.maxValLabel;
          this.sliderPayload.tag = res.data.question.slider.tag;

        } else if (this.selectedType === 'textArea') {
          this.textAreaPayload.title = res.data.question.textArea.title;
          this.textAreaPayload.description = res.data.question.textArea.description;
          this.textAreaPayload.placeholder = res.data.question.textArea.placeholder;

        } else if (this.selectedType === 'textInput') {
          this.textInputPayload.title = res.data.question.textInput.title;
          this.textInputPayload.description = res.data.question.textInput.description;
          this.textInputPayload.placeholder = res.data.question.textInput.placeholder;
        }

        this.loader.stop();
      } else {
        this.loader.stop();
        this.toaster.error(res.message);
      }
    })
  }
  //  -----------------------Multiple Choice------------------
  addMultipleChoice() {

    let payload = {
      question: {

        [this.selectedType]: this.multipleChoicePayload

      }
    }

    this.formSubmiited = true;
    if (this.multipleChoicePayload.options && this.multipleChoicePayload.options.length) {
if(this.multipleChoicePayload.maxAnswerCount>=0){
      if (this.multipleChoicePayload.title && (this.multipleChoicePayload.maxAnswerCount != null)) {
        this.loader.start();
        this.appsListService.addQuestions(this.appId, this.id, payload).subscribe((res: any) => {

          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();
            this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      } else {
        this.toaster.warning("Enter all required Fields!");
        this.loader.stop();
      }
    }else{
      this.toaster.warning('Enter Positive Value')
      this.loader.stop();
    }
    } else {
      this.toaster.warning("Enter options!");
      this.loader.stop();
    }

  }
  addMcqOptions(data: any) {

    if (data.toString().trim()) {
      this.multipleChoicePayload.options.push(data);
      this.mcqOptionsList = '';
    } else {
      this.toaster.warning("Option Text is empty!");
    }


  }
  deleteMcqOptions(i: any) {
    this.multipleChoicePayload.options.splice(i, 1);
  }
  updateMultipleChoice() {
    let payload = {
      question: {
        [this.selectedType]: this.multipleChoicePayload
      }
    }

    this.formSubmiited = true;
    if (this.multipleChoicePayload.options && this.multipleChoicePayload.options.length) {
if(this.multipleChoicePayload.maxAnswerCount >=0){
      if (this.multipleChoicePayload.title && (this.multipleChoicePayload.maxAnswerCount != null)) {

        this.loader.start();
        this.appsListService.updateQuestion(this.questionId, payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();
            this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])

          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      } else {
        this.toaster.warning("Enter all required Fields!");
      }}else{
        this.toaster.warning("Enter Positive Value")
      }
    } else {
      this.toaster.warning("Enter options!");
    }


  }
  // ----------Multi Text Input--------
  addMultiText() {
    let payload = {
      question: {

        [this.selectedType]: this.multiTextPayload

      }
    }

    this.formSubmiited = true;
    if (this.multiTextPayload.title) {

      this.loader.start();
      this.appsListService.addQuestions(this.appId, this.id, payload).subscribe((res: any) => {

        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Title!");
    }

  }
  updateMultiTextInput() {
    let payload = {
      question: {
        [this.selectedType]: this.multiTextPayload
      }
    }

    this.formSubmiited = true;
    if (this.multiTextPayload.title) {

      this.loader.start();
      this.appsListService.updateQuestion(this.questionId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Title!");
    }
  }
  // ------------Single Choice-------------
  addSingleChoice() {
    let payload = {
      question: {

        [this.selectedType]: this.singleChoicePayload

      }
    }

    this.formSubmiited = true;
    if (this.singleChoicePayload.options && this.singleChoicePayload.options.length) {

      if (this.singleChoicePayload.title) {
        this.appsListService.addQuestions(this.appId, this.id, payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();
            this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      } else {
        this.toaster.warning("Enter Title!");
      }
    } else {
      this.toaster.warning("Enter Options!");
    }

  }
  updateSingleChoice() {
    let payload = {
      question: {
        [this.selectedType]: this.singleChoicePayload
      }
    }

    this.formSubmiited = true;
    if (this.singleChoicePayload.options && this.singleChoicePayload.options.length) {

      if (this.singleChoicePayload.title) {
        this.appsListService.updateQuestion(this.questionId, payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();
            this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])

          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      } else {
        this.toaster.warning("Enter Title!");
      }
    } else {
      this.toaster.warning("Enter Options!");
    }
  }
  addSingleChoiceOptions(data: any) {

    if (data.toString().trim()) {
      this.singleChoicePayload.options.push(data);
      this.singleChoice = '';
    } else {
      this.toaster.warning("Enter Option Text!");
    }

  }
  deleteSingleChoiceOptions(i: any) {
    this.singleChoicePayload.options.splice(i, 1)
  }
  // ---------slider--------------
  addSliderOptions(data: any) {
    if (data.trim()) {
      this.sliderPayload.tag.push(data);
      this.tagList = '';
    } else {
      this.toaster.warning("Enter Tag Text!");
    }

  }
  deleteSliderOptions(i: any) {
    this.sliderPayload.tag.splice(i, 1)

  }

  // ------------------------Slider----------------
  addSlider() {
    let payload = {
      question: {

        [this.selectedType]: this.sliderPayload

      }
    }

    this.formSubmiited = true;
    if (this.sliderPayload.title && this.sliderPayload.minVal !== null && this.sliderPayload.maxVal !== null && this.sliderPayload.defaultAnswer !== null) {
if(this.sliderPayload.minVal>=0 && this.sliderPayload.maxVal>=0 && this.sliderPayload.defaultAnswer>=0){
      if (this.sliderPayload.tag && this.sliderPayload.tag.length) {

        if (this.sliderPayload.minVal < this.sliderPayload.maxVal) {

          if (this.sliderPayload.minVal <= this.sliderPayload.defaultAnswer && this.sliderPayload.defaultAnswer <= this.sliderPayload.maxVal) {
            if (this.sliderPayload.tag.length == ((this.sliderPayload.maxVal - this.sliderPayload.minVal) + 1)) {
              this.loader.start();
              this.appsListService.addQuestions(this.appId, this.id, payload).subscribe((res: any) => {

                if (res.statusCode == 200) {
                  this.toaster.success(res.message);
                  this.loader.stop();
                  this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
                } else {
                  this.toaster.error(res.message);
                  this.loader.stop();
                }
              }, (error) => {
                this.toaster.error(error);
                this.loader.stop();
              })
            } else {
              this.toaster.warning("Tag length must be equal to " + ((this.sliderPayload.maxVal - this.sliderPayload.minVal) + 1));
              this.loader.stop();
            }
          } else {
            this.toaster.warning("Default Answer must be between " + this.sliderPayload.minVal + " and " + this.sliderPayload.maxVal);
            this.loader.stop();
          }

        } else {
          this.toaster.warning("Max value should be greater than min value!");
          this.loader.stop();
        }
      } else {
        this.toaster.warning("Enter Tags");
        this.loader.stop();
      }}else{
        this.toaster.warning("Enter Positive Value")
       this.loader.stop();}
    } else {
      this.toaster.warning("Enter all required Fields");
      this.loader.stop();
    }

  }
  updateSlider() {
    let payload = {
      question: {
        [this.selectedType]: this.sliderPayload
      }
    }

    this.formSubmiited = true;
    if (this.sliderPayload.title && this.sliderPayload.minVal !== null && this.sliderPayload.maxVal !== null && this.sliderPayload.defaultAnswer !== null) {
if(this.sliderPayload.minVal>=0 && this.sliderPayload.maxVal>=0 && this.sliderPayload.defaultAnswer>=0){
      if (this.sliderPayload.tag && this.sliderPayload.tag.length) {
        if (this.sliderPayload.minVal < this.sliderPayload.maxVal) {

          if (this.sliderPayload.minVal <= this.sliderPayload.defaultAnswer && this.sliderPayload.defaultAnswer <= this.sliderPayload.maxVal) {
            if (this.sliderPayload.tag.length == ((this.sliderPayload.maxVal - this.sliderPayload.minVal) + 1)) {
              this.loader.start();
              this.appsListService.updateQuestion(this.questionId, payload).subscribe((res: any) => {
                if (res.statusCode == 200) {
                  this.toaster.success(res.message);
                  this.loader.stop();
                  this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])

                } else {
                  this.toaster.error(res.message);
                  this.loader.stop();
                }
              }, (error) => {
                this.toaster.error(error);
                this.loader.stop();
              })
            } else {
              this.toaster.warning("Tag length must be equal to " + ((this.sliderPayload.maxVal - this.sliderPayload.minVal) + 1));
            }
          } else {
            this.toaster.warning("Default Answer must be between " + this.sliderPayload.minVal + " and " + this.sliderPayload.maxVal);
          }

        } else {
          this.toaster.warning("Max value should be greater than min value!");
        }
      } else {
        this.toaster.warning("Enter Tags!");
      }}else{
this.toaster.warning("Enter Positive Value")
      }
    } else {
      this.toaster.warning("Enter all required Fields!");
    }
  }
  // --------------------Text Area--------------
  addTextArea() {
    let payload = {
      question: {

        [this.selectedType]: this.textAreaPayload

      }
    }
    this.formSubmiited = true;
    if (this.textAreaPayload.title) {
      this.loader.start();
      this.appsListService.addQuestions(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Title!");
    }

  }
  updateTextArea() {
    let payload = {
      question: {
        [this.selectedType]: this.textAreaPayload
      }
    }
    this.formSubmiited = true;
    if (this.textAreaPayload.title) {
      this.loader.start();
      this.appsListService.updateQuestion(this.questionId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Title!");
    }
  }
  // ------------------Text Input-------------
  addTextInput() {
    let payload = {
      question: {

        [this.selectedType]: this.textInputPayload

      }
    }
    this.formSubmiited = true;
    if (this.textInputPayload.title) {
      this.loader.start();
      this.appsListService.addQuestions(this.appId, this.id, payload).subscribe((res: any) => {

        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Title!");
    }
  }
  updateTextInput() {
    let payload = {
      question: {
        [this.selectedType]: this.textInputPayload
      }
    }
    this.formSubmiited = true;
    if (this.textInputPayload.title) {
      this.loader.start();
      this.appsListService.updateQuestion(this.questionId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Title!");
    }
  }
}
