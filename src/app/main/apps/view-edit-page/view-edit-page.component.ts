import { Subscription } from 'rxjs';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/shared/services/app.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
@Component({
  selector: 'app-view-edit-page',
  templateUrl: './view-edit-page.component.html',
  styleUrls: ['./view-edit-page.component.css']
})
export class ViewEditPageComponent implements OnInit , OnDestroy {
  appId: any;
  id: any;
  appsList: any;
  active: any;
  title: any;
  group: any;
  categories: any;
  questionsList: any;
  activeTab: any;
  showSidebar = false;
  description :any;
  headerTitle = '';
  sideBarSubscription:Subscription = new Subscription();
  constructor(private route: ActivatedRoute,

    private router: Router,
    private AppService: AppService,
    private appsListService: AppListService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private modalService: NgbModal,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.activeTab = this.router.url.split('/')[3];
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.appId = params.appId;

        if (params.id) {
          this.id = params.id;

        }

      }
    })


    this.getPageData();
  }

  routeBack() {
    this.router.navigate(['/' + 'apps/' + this.appId + '/page/list']);
  }

  getPageData() {

    this.loader.start();
    this.appsListService.getPageById(this.appId, this.id).subscribe((res: any) => {
      if (res.statusCode == 200) {


        this.questionsList = res.data.questioner?.questions;
        this.questionsList.forEach((ele: any, index: any) => {
          ele['sequence'] = index;
        })

        this.headerTitle = 'View Questionnaire - ' + this.questionsList.length;
        this.commonService.setMainTitleToggle(this.headerTitle);
        this.appsList = res.data;

        this.active = res.data.questioner.active;
        this.title = res.data.questioner.title;
        this.categories = res.data.questioner.categories?.name;
        this.description = res.data.questioner.description;
        this.group = res.data.questioner.group?.name

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
  editQuestioner() {
    this.router.navigate(['apps/' + this.appId + '/page/edit/' + this.id])
  }

  addQuestion() {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/add'])
  }
  editMultipleChoice(id: any) {

    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/edit/' + id])
  }
  editMultiTextInput(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/edit/' + id])
  }
  editSingleChoice(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/edit/' + id])
  }
  editSlider(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/edit/' + id])
  }
  editTextArea(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/edit/' + id])
  }
  editTextInput(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/question/edit/' + id])
  }

  deleteQuestion(i:any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.questionsList.splice(i, 1);
        this.questionsList.forEach((ele: any, index: any) => {
          ele['sequence'] = index;
        })

        this.appsList.questioner.questions = this.questionsList.map((ele: any) => ({ "id": ele._id, "sequence": ele.sequence }));

        let obj = {
          page: [this.appsList]
        }
        this.loader.start();
        this.appsListService.editPagesType(this.appId, this.id, obj).subscribe((res: any) => {
          if (!res.error) {
            this.toaster.success("Deleted Successfully.");
            this.loader.stop();
            this.getPageData();
          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        })
      }
    })
  }
  // deleteQuestion(i: any) {

  //   this.questionsList.splice(i, 1);
  //   this.questionsList.forEach((ele: any, index: any) => {
  //     ele['sequence'] = index;
  //   })

  //   this.appsList.questioner.questions = this.questionsList.map((ele: any) => ({ "id": ele._id, "sequence": ele.sequence }));

  //   let obj = {
  //     page: [this.appsList]
  //   }
  //   this.loader.start();
  //   this.appsListService.editPagesType(this.appId, this.id, obj).subscribe((res: any) => {
  //     if (!res.error) {
  //       this.toaster.success("Deleted Successfully.");
  //       this.loader.stop();
  //       this.getPageData();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop();
  //     }
  //   })

  // }

  deleteMultipleChoice(id: any) {
    this.loader.start();
    this.appsListService.deleteQuestion(this.appId, this.id, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getPageData();
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
  deleteMultiTextInput(id: any) {
    this.loader.start();
    this.appsListService.deleteQuestion(this.appId, this.id, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getPageData();
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
  deleteSingleChoice(id: any) {
    this.loader.start();
    this.appsListService.deleteQuestion(this.appId, this.id, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getPageData();
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
  deleteSlider(id: any) {
    this.loader.start();
    this.appsListService.deleteQuestion(this.appId, this.id, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getPageData();
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
  deleteTextArea(id: any) {
    this.loader.start();
    this.appsListService.deleteQuestion(this.appId, this.id, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getPageData();
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
  deleteTextInput(id: any) {
    this.loader.start();
    this.appsListService.deleteQuestion(this.appId, this.id, id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.getPageData();
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
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionsList, event.previousIndex, event.currentIndex);

    this.questionsList.forEach((ele: any, index: any) => {
      ele['sequence'] = index;
    })

    this.appsList.questioner.questions = this.questionsList.map((ele: any) => ({ "id": ele._id, "sequence": ele.sequence }));

    let obj = {
      page: [this.appsList]
    }
    this.loader.start();
    this.appsListService.editPagesType(this.appId, this.id, obj).subscribe((res: any) => {
      if (!res.error) {
        this.toaster.success("Sequence updated.");
        this.loader.stop();
        this.getPageData();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    })

  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
