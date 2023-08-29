import { Component, OnInit } from '@angular/core';
import { dynamicSlider, multiChoiceGroup, tableDropDown, tableSkill, tableSkillTrait, tableTrait, tableYesNo } from 'src/app/shared/models/pages';
import { AppListService } from 'src/app/shared/services/apps-list.service';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-add-edit-questioner-dynamic',
  templateUrl: './add-edit-questioner-dynamic.component.html',
  styleUrls: ['./add-edit-questioner-dynamic.component.css']
})
export class AddEditQuestionerDynamicComponent implements OnInit {
  multipleChoicePayload: multiChoiceGroup = new multiChoiceGroup();
  dynamicSliderPayload: dynamicSlider = new dynamicSlider();
  tableDropDownPayload: tableDropDown = new tableDropDown();
  tableSkillPayload: tableSkill = new tableSkill();
  tableSkillTraitPayload: tableSkillTrait = new tableSkillTrait();
  tableTraitPayload: tableTrait = new tableTrait();
  tableYesNoPayload: tableYesNo = new tableYesNo();
  selectedDynamicType: any;
  formSubmiited = false;
  // tagList: any = [];
  tableDropDownList: any;
  tagList: any;
  tableSkillList: any;
  tableTraitColumnList: any;
  tableTraitValuesList: any;

  appId: any;
  id: any;
  templateId: any;
  title = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appsListService: AppListService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.title = 'Add Template';
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.appId = params.appId;

        this.id = params.pageId;
        this.templateId = params.id
        if (this.appId && this.templateId) {
          this.title = 'Edit Template';
          this.getDataOfTemplate();
        }

      }
    });

    this.commonService.setMainTitleToggle(this.title);
  }

  routeBack() {
    this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id]);
  }

  getDataOfTemplate() {
    this.loader.start();
    this.appsListService.getTemplateById(this.appId, this.templateId).subscribe((res: any) => {

      if (!res.error) {
        let keys = Object.keys(res.data.template)
        this.selectedDynamicType = keys[0];
        if (this.selectedDynamicType == 'multipleChoice') {
          this.multipleChoicePayload.source = res.data.template.multipleChoice.source ? res.data.template.multipleChoice.source : null;
          this.multipleChoicePayload.minAnswerCount = res.data.template.multipleChoice.minAnswerCount;
          this.multipleChoicePayload.maxAnswerCount = res.data.template.multipleChoice.maxAnswerCount;
        } else if (this.selectedDynamicType == 'slider') {
          this.dynamicSliderPayload.source = res.data.template.slider.source ? res.data.template.slider.source : null;
          this.dynamicSliderPayload.tag = res.data.template.slider.tag;
          this.dynamicSliderPayload.filterOn = res.data.template.slider.filterOn;
          this.dynamicSliderPayload.maxVal = res.data.template.slider.maxVal;
          this.dynamicSliderPayload.minVal = res.data.template.slider.minVal;
          this.dynamicSliderPayload.defaultAnswer = res.data.template.slider.defaultAnswer;
          this.dynamicSliderPayload.minValLabel = res.data.template.slider.minValLabel;
          this.dynamicSliderPayload.maxValLabel = res.data.template.slider.maxValLabel;
        }
        else if (this.selectedDynamicType == 'tableDropDown') {
          this.tableDropDownPayload.source = res.data.template.tableDropDown.source ? res.data.template.tableDropDown.source : null;
          this.tableDropDownPayload.colOneTitle = res.data.template.tableDropDown.colOneTitle;
          this.tableDropDownPayload.colTwoTitle = res.data.template.tableDropDown.colTwoTitle;
          this.tableDropDownPayload.colThreeTitle = res.data.template.tableDropDown.colThreeTitle;
          this.tableDropDownPayload.options = res.data.template.tableDropDown.options;
        }
        else if (this.selectedDynamicType == 'tableSkill') {
          this.tableSkillPayload.source = res.data.template.tableSkill.source ? res.data.template.tableSkill.source : null;
          this.tableSkillPayload.dataId = res.data.template.tableSkill.dataId;
          this.tableSkillPayload.colOneTitle = res.data.template.tableSkill.colOneTitle;
          this.tableSkillPayload.colTwoTitle = res.data.template.tableSkill.colTwoTitle;
          this.tableSkillPayload.colThreeTitle = res.data.template.tableSkill.colThreeTitle;
          this.tableSkillPayload.colFourTitle = res.data.template.tableSkill.colFourTitle;
          this.tableSkillPayload.colFiveTitle = res.data.template.tableSkill.colFiveTitle;
          this.tableSkillPayload.options = res.data.template.tableSkill.options;

        } else if (this.selectedDynamicType == 'tableSkillTrait') {
          this.tableSkillTraitPayload.source = res.data.template.tableSkillTrait.source ? res.data.template.tableSkillTrait.source : null;
          this.tableSkillTraitPayload.dataId = res.data.template.tableSkillTrait.dataId;
          this.tableSkillTraitPayload.filterOn = res.data.template.tableSkillTrait.filterOn;
        } else if (this.selectedDynamicType == 'tableTrait') {
          this.tableTraitPayload.source = res.data.template.tableTrait.source ? res.data.template.tableTrait.source : null;
          this.tableTraitPayload.dataId = res.data.template.tableTrait.dataId;
          this.tableTraitPayload.columns = res.data.template.tableTrait.columns;
          this.tableTraitPayload.values = res.data.template.tableTrait.values;

        } else if (this.selectedDynamicType == 'tableYesNo') {

          this.tableYesNoPayload.source = res.data.template.tableYesNo.source ? res.data.template.tableYesNo.source : null;
          this.tableYesNoPayload.firstColumnTitle = res.data.template.tableYesNo.firstColumnTitle;
          this.tableYesNoPayload.secondColumnTitle = res.data.template.tableYesNo.secondColumnTitle;
        }

        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }

    })
  }
  // -------------Multiple Choice------------
  saveMultipleChoice() {

    let payload = {
      template: {
        [this.selectedDynamicType]: this.multipleChoicePayload
      }
    }
    this.formSubmiited = true;
    if (this.multipleChoicePayload.source) {
      if (this.multipleChoicePayload.minAnswerCount >= 0 && this.multipleChoicePayload.maxAnswerCount >= 0) {
        this.loader.start();
        this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();

            this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      } else {
        this.toaster.warning("Enter Positive Values");
        this.loader.stop();
      }
    } else {
      this.toaster.warning("Enter Source");
      this.loader.stop();
    }
  }
  updateMultipleChoice() {
    this.loader.start();
    let payload = {
      template: {
        [this.selectedDynamicType]: this.multipleChoicePayload
      }
    }
    this.formSubmiited = true;
    if (this.multipleChoicePayload.source) {
      if (this.multipleChoicePayload.minAnswerCount >= 0 && this.multipleChoicePayload.maxAnswerCount >= 0) {
        this.loader.start();
        this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();
            this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      } else {
        this.toaster.warning("Enter Positive Values");
        this.loader.stop();
      }
    } else {
      this.toaster.warning("Enter Source");
      this.loader.stop();
    }
  }
  // ------------------Slider--------
  saveDynamicSlider() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.dynamicSliderPayload
      }
    }
    this.formSubmiited = true;

    if (this.dynamicSliderPayload.source && this.dynamicSliderPayload.minVal !== null && this.dynamicSliderPayload.source.maxVal !== null && this.dynamicSliderPayload.source.defaultAnswer !== null) {
      if (this.dynamicSliderPayload.filterOn >= 0 && this.dynamicSliderPayload.maxVal >= 0 && this.dynamicSliderPayload.minVal && this.dynamicSliderPayload.defaultAnswer >= 0) {
        if (this.dynamicSliderPayload.tag && this.dynamicSliderPayload.tag.length) {
          if (this.dynamicSliderPayload.minVal < this.dynamicSliderPayload.maxVal) {

            if (this.dynamicSliderPayload.minVal <= this.dynamicSliderPayload.defaultAnswer && this.dynamicSliderPayload.defaultAnswer <= this.dynamicSliderPayload.maxVal) {
              if (this.dynamicSliderPayload.tag.length == ((this.dynamicSliderPayload.maxVal - this.dynamicSliderPayload.minVal) + 1)) {
                this.loader.start();
                this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
                  if (res.statusCode == 200) {
                    this.toaster.success(res.message);
                    this.loader.stop();
                    this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

                  } else {
                    this.toaster.error(res.message);
                    this.loader.stop();
                  }
                }, (error) => {
                  this.toaster.error(error);
                  this.loader.stop();
                })
              } else {
                this.toaster.warning("Tag length must be equal to " + ((this.dynamicSliderPayload.maxVal - this.dynamicSliderPayload.minVal) + 1));
              }
            } else {
              this.toaster.warning("Default Answer must be between " + this.dynamicSliderPayload.minVal + " and " + this.dynamicSliderPayload.maxVal);
            }

          } else {
            this.toaster.warning("Max value should be greater than min value");
          }
        } else {
          this.toaster.warning("Enter Tags");
        }
      } else {
        this.toaster.warning("Enter Positive Value")
      }
    }
    else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  updateSlider() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.dynamicSliderPayload
      }
    }
    this.formSubmiited = true;

    if (this.dynamicSliderPayload.source && this.dynamicSliderPayload.minVal !== null && this.dynamicSliderPayload.maxVal !== null && this.dynamicSliderPayload.defaultAnswer !== null) {
      if (this.dynamicSliderPayload.filterOn >= 0 && this.dynamicSliderPayload.maxVal >= 0 && this.dynamicSliderPayload.minVal && this.dynamicSliderPayload.defaultAnswer >= 0){
      if (this.dynamicSliderPayload.tag && this.dynamicSliderPayload.tag.length) {
        if (this.dynamicSliderPayload.minVal < this.dynamicSliderPayload.maxVal) {

          if (this.dynamicSliderPayload.minVal <= this.dynamicSliderPayload.defaultAnswer && this.dynamicSliderPayload.defaultAnswer <= this.dynamicSliderPayload.maxVal) {
            if (this.dynamicSliderPayload.tag.length == ((this.dynamicSliderPayload.maxVal - this.dynamicSliderPayload.minVal) + 1)) {
              this.loader.start();
              this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
                if (res.statusCode == 200) {
                  this.toaster.success(res.message);
                  this.loader.stop();
                  this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

                } else {
                  this.toaster.error(res.message);
                  this.loader.stop();
                }
              }, (error) => {
                this.toaster.error(error);
                this.loader.stop();
              })
            } else {
              this.toaster.warning("(Max Value - Min Value) must be equal to tag length");
            }
          } else {
            this.toaster.warning("Default Answer must be between " + this.dynamicSliderPayload.minVal + " and " + this.dynamicSliderPayload.maxVal);
          }

        } else {
          this.toaster.warning("Max value should be greater than min value");
        }
      } else {
        this.toaster.warning("Enter Tags");
      }}else{
        this.toaster.warning("Enter Positive Value")
      }
    }
    else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  // --------------Table Drop Down-----------
  saveTableDropDown() {

    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableDropDownPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableDropDownPayload.source && this.tableDropDownPayload.colOneTitle && this.tableDropDownPayload.colTwoTitle && this.tableDropDownPayload.colThreeTitle) {
      this.loader.start();
      this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();

          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  updateTableDropDown() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableDropDownPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableDropDownPayload.source && this.tableDropDownPayload.colOneTitle && this.tableDropDownPayload.colTwoTitle && this.tableDropDownPayload.colThreeTitle) {
      this.loader.start();
      this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  // ---------------Table Skill-------
  saveTableSkill() {

    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableSkillPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableSkillPayload.source && this.tableSkillPayload.dataId && this.tableSkillPayload.colOneTitle && this.tableSkillPayload.colTwoTitle && this.tableSkillPayload.colThreeTitle && this.tableSkillPayload.colFiveTitle && this.tableSkillPayload.colFiveTitle) {
      this.loader.start();
      this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();

          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields!");
    }
  }
  updateTableSkill() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableSkillPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableSkillPayload.source && this.tableSkillPayload.dataId && this.tableSkillPayload.colOneTitle && this.tableSkillPayload.colTwoTitle && this.tableSkillPayload.colThreeTitle && this.tableSkillPayload.colFiveTitle && this.tableSkillPayload.colFiveTitle) {
      this.loader.start();
      this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields!");
    }
  }
  // --------------table Skill Trait-----------
  saveTableSkillTrait() {

    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableSkillTraitPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableSkillTraitPayload.source && this.tableSkillTraitPayload.dataId) {
      this.loader.start();
      this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {

          this.toaster.success(res.message);
          this.loader.stop();

          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  updateTableSkillTrait() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableSkillTraitPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableSkillTraitPayload.source && this.tableSkillTraitPayload.dataId) {
      this.loader.start();
      this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  // ----------Table Trait--------
  saveTableTrait() {

    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableTraitPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableTraitPayload.source && this.tableTraitPayload.dataId) {
      this.loader.start();
      this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();

          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  updateTableTrait() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableTraitPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableTraitPayload.source && this.tableTraitPayload.dataId) {
      this.loader.start();
      this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  // ----Table Yes No--------------
  saveTableYesNo() {

    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableYesNoPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableYesNoPayload.source && this.tableYesNoPayload.firstColumnTitle && this.tableYesNoPayload.secondColumnTitle) {
      this.loader.start();
      this.appsListService.addTemplate(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();

          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter All The Required Fields");
    }
  }
  updateTableYesNo() {
    let payload = {
      template: {
        [this.selectedDynamicType]: this.tableYesNoPayload
      }
    }
    this.formSubmiited = true;
    if (this.tableYesNoPayload.source) {
      this.loader.start();
      this.appsListService.updateTemplate(this.templateId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning("Enter Source");
    }
  }
  addTag(data: any) {
    if (data) {
      this.dynamicSliderPayload.tag.push(data);
      this.tagList = '';
    } else {
      this.toaster.warning("Option Text is empty");
    }
  }
  deleteTag(i: any) {
    this.dynamicSliderPayload.tag.splice(i, 1)
  }
  addTableDropDownOption(data: any) {
    if (data) {
      this.tableDropDownPayload.options.push(data);

      this.tableDropDownList = '';

    } else {
      this.toaster.warning("Option Text is empty");
    }
  }

  deleteTableDropDownOption(i: any) {
    this.tableDropDownPayload.options.splice(i, 1)
  }
  addTableSkillOption(data: any) {
    if (data) {
      this.tableSkillPayload.options.push(data);

      this.tableSkillList = '';

    } else {
      this.toaster.warning("Option Text is empty");
    }
  }
  deleteTableSkillOption(i: any) {
    this.tableSkillPayload.options.splice(i, 1);
  }
  addColumns(data: any) {
    if (data) {
      this.tableTraitPayload.columns.push(data);

      this.tableTraitColumnList = '';

    } else {
      this.toaster.warning("Option Text is empty");
    }
  }
  deleteColumns(i: any) {
    this.tableTraitPayload.columns.splice(i, 1);
  }
  addValues(data: any) {
    if (data) {
      this.tableTraitPayload.values.push(data);

      this.tableTraitValuesList = '';

    } else {
      this.toaster.warning("Option Text is empty");
    }
  }
  deleteValues(i: any) {
    this.tableTraitPayload.values.splice(i, 1);
  }

  cancel() {
    this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + this.id])
  }
}
