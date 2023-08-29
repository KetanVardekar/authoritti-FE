import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/services/app.service';
import { CustomTemplate, intro, questionnarie, questionnarieDynamic, report, section } from 'src/app/shared/models/pages';
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-pages',
  templateUrl: './add-edit-pages.component.html',
  styleUrls: ['./add-edit-pages.component.css']
})
export class AddEditPagesComponent implements OnInit, OnDestroy {
  introPayload: intro = new intro();
  sectionPayload: section = new section();
  questionnariePayload: questionnarie = new questionnarie();
  questionerDynamicPayload: questionnarieDynamic = new questionnarieDynamic();
  reportPayload: report = new report();
  customTemplatePayload: CustomTemplate = new CustomTemplate();
  formSubmitted = false;
  activeTab: any;
  appId: any;
  actions: any;
  selectedOption: any;
  groupsList: any;
  categories: any;
  category: any = {
    name: '',
    description: '',
  }
  group: any = {
    name: '',
    title: '',
    description: '',
  }
  id: any;
  categoriesList: any;
  pageId: any
  selectedType: any;
  showSidebar = false;
  title = '';
  sequence: any;
  sideBarSubscription: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private appsListService: AppListService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private AppService: AppService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.route.params.subscribe((params: any) => {

      if (params) {
        this.appId = params.appId;

        if (params.id) {
          this.id = params.id;
        }

      }
    })
    this.activeTab = this.router.url.split('/')[3];
    if (this.activeTab === 'page' && this.id) {
      this.getPageById();
      this.title = 'Edit Page';
      this.getCategoriesList();
      this.getGroupsList();
    }
    else if (this.activeTab === 'categories' && this.id) {
      this.getCategories();
      this.title = 'Edit Category';
    } else if (this.activeTab === 'groups' && this.id) {
      this.getGroup();
      this.title = 'Edit Group';
    } else if (this.activeTab === 'page' && !this.id) {
      this.title = 'Add Page';
      this.getCategoriesList();
      this.getGroupsList();
    }
    else if (this.activeTab === 'categories' && !this.id) {
      this.title = 'Add Category';
    } else if (this.activeTab === 'groups' && !this.id) {
      this.title = 'Add Group';
    }

    this.commonService.setMainTitleToggle(this.title);

  }

  routeBack() {
    this.router.navigate(['/' + 'apps/' + this.appId + '/page/list']);
  }
  getPageById() {
    this.loader.start();
    this.appsListService.getPageById(this.appId, this.id).subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.sequence = res.data.sequence;
        this.selectedType = Object.keys(res.data)

        let index = this.selectedType.indexOf("_id");
        this.selectedType.splice(index, 1);

        if (this.selectedType.length > 1) {
          let finalIndex = this.selectedType.indexOf("sequence")
          this.selectedType.splice(finalIndex, 1)

          this.selectedOption = this.selectedType[0];
        } else {

          this.selectedOption = this.selectedType[0];
        }

        if (this.selectedOption === 'intro') {

          this.introPayload.active = res.data.intro.active;
          this.introPayload.description = res.data.intro.description;
          this.introPayload.icon = res.data.intro.icon;
          this.introPayload.title = res.data.intro.title;
          this.introPayload.videolink = res.data.intro.videolink;
        } else if (this.selectedOption === 'section') {
          this.sectionPayload.active = res.data.section.active;
          this.sectionPayload.title = res.data.section.title;
        } else if (this.selectedOption === 'report') {
          this.reportPayload.active = res.data.report.active;
          this.reportPayload.type = res.data.report.type;
          this.reportPayload.description = res.data.report.description;
        } else if (this.selectedOption === 'questioner') {
          this.questionnariePayload.active = res.data.questioner.active;
          this.questionnariePayload.title = res.data.questioner.title;
          this.questionnariePayload.hideTitle = res.data.questioner.hideTitle;
          this.questionnariePayload.multiColLayout = res.data.questioner.multiColLayout;
          this.questionnariePayload.overrideNextBtn = res.data.questioner.overrideNextBtn;
          this.questionnariePayload.description = res.data.questioner.description;
          this.questionnariePayload.categories = res.data.questioner.categories?._id;
          this.questionnariePayload.group = res.data.questioner.group?._id;
          this.questionnariePayload.tag = res.data.questioner.tag;
          this.questionnariePayload.questions = res.data.questioner.questions.map((ele: any, i: any) => ({ "id": ele._id, "sequence": ele.sequence }));
        } else if (this.selectedOption === 'dynamic_question') {
          this.questionerDynamicPayload.active = res.data.dynamic_question.active;
          this.questionerDynamicPayload.title = res.data.dynamic_question.title;
          this.questionerDynamicPayload.description = res.data.dynamic_question.description;
          this.questionerDynamicPayload.group = res.data.dynamic_question.group?._id;
          this.questionerDynamicPayload.template = res.data.dynamic_question.template;
        } else if (this.selectedOption === 'custom_template') {
          this.customTemplatePayload.name = res.data.custom_template.name;
          this.customTemplatePayload.active = res.data.custom_template.active;
        }
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }
  cancel() {
    this.router.navigate(['apps/' + this.appId + '/page/list'])
  }

  // -----------------------Add Pages -----------------------

  addPage(type: any, myForm: any) {

    let payload: any = {
      page: []
    }

    let valid = true;

    if (type == 'intro') {
      let obj = {
        [type]: this.introPayload
      }
      payload.page.push(obj);
    } else if (type == 'section') {
      let obj = {
        [type]: this.sectionPayload
      }
      payload.page.push(obj);
    } else if (type == 'questioner') {

      if (this.questionnariePayload.title) {
        let obj = {
          [type]: this.questionnariePayload
        }
        payload.page.push(obj);
      } else {
        valid = false;
      }

    } else if (type == 'dynamic_question') {
      let obj = {
        [type]: this.questionerDynamicPayload
      }
      payload.page.push(obj);
    } else if (type == 'report') {
      let obj = {
        [type]: this.reportPayload
      }
      payload.page.push(obj);
    } else if (type == 'custom_template') {
      let obj = {
        [type]: this.customTemplatePayload
      }
      payload.page.push(obj);
    }

    if (myForm.valid && valid) {
      this.loader.start();
      this.appsListService.addPagesType(this.appId, payload).subscribe((res: any) => {

        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/list'])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    }

  }

  // --------------------- Update Page --------------------------

  updatePage(type: any, myForm: any) {

    let payload: any = {
      page: []
    }

    let valid = true;

    if (type == 'intro') {
      let obj = {
        sequence: this.sequence,
        [type]: this.introPayload
      }
      payload.page.push(obj);
    } else if (type == 'section') {
      let obj = {
        sequence: this.sequence,
        [type]: this.sectionPayload
      }
      payload.page.push(obj);
    } else if (type == 'questioner') {
      if (this.questionnariePayload.title) {
        this.questionnariePayload.questions = this.questionnariePayload.questions.map((ele: any) =>
          ({ "id": ele.id, "sequence": ele.sequence }))
        let obj = {
          sequence: this.sequence,
          [type]: this.questionnariePayload
        }
        payload.page.push(obj);
      } else {
        valid = false;
      }

    } else if (type == 'dynamic_question') {

      this.questionerDynamicPayload.template = this.questionerDynamicPayload.template?._id;
      let obj = {
        sequence: this.sequence,
        [type]: this.questionerDynamicPayload
      }
      payload.page.push(obj);
    } else if (type == 'report') {
      let obj = {
        [type]: this.reportPayload
      }
      payload.page.push(obj);
    } else if (type == 'custom_template') {
      let obj = {
        sequence: this.sequence,
        [type]: this.customTemplatePayload
      }
      payload.page.push(obj);
    }

    if (myForm.valid && valid) {
      this.loader.start();
      this.appsListService.editPagesType(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {

          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/page/list'])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    }

  }

  // ------------------------------Categories(Get,Create,Update)--------------------
  getCategories() {
    this.loader.start()
    this.appsListService.getDataByCategoryId(this.appId, this.id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.category.name = res.data.name;
        this.category.description = res.data.description;
        this.loader.stop();
      }
      else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })

  }
  addCategories(myForm: any) {
    let payload = {

      name: this.category.name.trim(),
      description: this.category.description.trim()

    }
    if (myForm.valid) {
      this.appsListService.addCategoryData(this.appId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/categories/list'])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning('Please Add Name')
    }
  }

  setDescription(event: string) {

    if (event == 'archetype') {
      this.reportPayload.description =
        '1- Group all questions of each category separately.\n' +
        '2- Calculate the sum of each group.\n' +
        '3- Finally, show the results in Highest to Lowest order.';
    } else if (event == 'driver') {
      this.reportPayload.description =
        '1- Group all questions of each category separately.\n' +
        '2- Calculate the sum of each group.\n' +
        '3- Find the total number of questions of all groups.\n' +
        '4- Calculate result of each group by formula => (SumOfGroup * 10) / TotalNumberOfQuestionsFromAllGroups\n' +
        '5- Finally, calculate \'Egotistical\' by formula => (SumOfAllGroups * 10) / TotalNumberOfQuestionsFromAllGroups';
    } else if (event == 'emotions') {
      this.reportPayload.description = '';
    } else if (event == 'financialGoals') {
      this.reportPayload.description = '';
    } else if (event == 'naturalGifts') {
      this.reportPayload.description =
        '1- Group all questions of each category separately.\n' +
        '2- Calculate the sum of each group.\n' +
        '3- Now, first display categorical results in Highest to Lowest order.\n' +
        '4- Finally show all the remaining answered questions.';
    } else if (event == 'simple') {
      this.reportPayload.description =
        '1- Combine all questions in a group if exists.\n' +
        '2- Show all the questions which have answer.';
    } else if (event == 'skills') {
      this.reportPayload.description = '';
    } else if (event == 'traits') {
      this.reportPayload.description =
        '1- Group all questions of each category separately.\n' +
        '2- Calculate the sum of each group.\n' +
        '3- Find the total number of questions of each group.\n' +
        '4- Calculate the result of each group by formula => (SumOfGroup / TotalNumberOfQuestionsFromGroup)\n' +
        '5- Finally, show the results as \'Masculine\' and \'Feminine\'';
    }
  }

  getCategoriesList() {
    this.loader.start();
    this.appsListService.getcategoriesByApplicationId(this.appId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.categories = res.data;
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }
  getGroupsList() {
    this.loader.start();
    this.appsListService.getGroupsByApplicationId(this.appId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.groupsList = res.data;
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }

  updateCategories(myForm: any) {
    let payload = {

      name: this.category.name.trim(),
      description: this.category.description.trim()

    }
    if (myForm.valid) {
      this.loader.start();
      this.appsListService.updateCategory(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/categories/list'])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning('Please Fill All The Fields')
    }
  }
  cancelofCategory() {
    this.router.navigate(['apps/' + this.appId + '/categories/list'])
  }
  // -----------------------------Group(Get,Create,Update)------------------
  getGroup() {
    this.loader.start()
    this.appsListService.getDataByGroupyId(this.appId, this.id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.group.name = res.data.name;
        this.group.description = res.data.description;
        this.group.title = res.data.title;
        this.loader.stop();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })

  }

  addGroup(myForm: any) {
    let payload = {

      name: this.group.name.trim(),
      title: this.group.title.trim(),
      description: this.group.description.trim(),

    }
    if (myForm.valid) {
      this.loader.start();
      this.appsListService.addGroupData(this.appId, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/groups/list'])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning('Please Fill All The Fields')
    }

  }
  updateGroups(myForm: any) {
    let payload = {

      name: this.group.name,
      title: this.group.title,
      description: this.group.description,

    }
    if (myForm.valid) {
      this.loader.start();
      this.appsListService.updateGroup(this.appId, this.id, payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps/' + this.appId + '/groups/list'])
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.warning('Please Fill All The Details')
    }
  }


  cancelofGroups() {
    this.router.navigate(['apps/' + this.appId + '/groups/list'])
  }

  pages() {
    this.commonService.setSidebarToggle(false);
    this.router.navigate(['apps/' + this.appId + '/page/list'])
  }
  categoriesRoute() {
    this.commonService.setSidebarToggle(false);
    this.router.navigate(['apps/' + this.appId + '/categories/list'])
  }
  groups() {
    this.commonService.setSidebarToggle(false);
    this.router.navigate(['apps/' + this.appId + '/groups/list'])
  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
