import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { intro, section } from 'src/app/shared/models/pages';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent implements OnInit , OnDestroy {
  introPayload: intro = new intro();
  sectionPayload: section = new section();
  appId: any;
  addNewProject: any;
  activeTab: any;
  pagesList: any;
  showSidebar = false;
  introPart: any;
  sectionPart: any;
  categoriesList: any;
  groupsList: any;
  pagesListData: any;
  title = '';
  sideBarSubscription:Subscription = new Subscription();
  constructor(private AppService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private appsListService: AppListService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private commonService: CommonService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {


    this.sideBarSubscription = this.commonService.sidebarToggle.subscribe((res: any) => {
      this.showSidebar = res;
    });

    this.route.params.subscribe((params: any) => {

      this.appId = params.appId;
    })
    this.getAppDataById();

    this.activeTab = this.router.url.split('/')[3];


  }
  getAppDataById() {
    this.loader.start();
    this.AppService.getAppById(this.appId).subscribe((res: any) => {

      this.title = res.data.title;
      this.title = this.title + ' - Page\'s List';
      this.commonService.setMainTitleToggle(this.title);
      this.categoriesList = res.data.categories;
      this.groupsList = res.data.group;
      this.addNewProject = res.data.page.length;
      this.pagesListData = res.data.page;

      let reportData = this.pagesListData.filter((ele: any) => {
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

      let exceptReportData = this.pagesListData.filter((ele: any) => {
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


      this.pagesListData = [...exceptReportData, ...reportData];

      this.pagesListData.forEach((ele: any, index: any) => {
        ele['sequence'] = index;
      })

    })
    this.loader.stop();
  }
  deleteGroupById(id:any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.loader.start();
    this.appsListService.deleteGroup(this.appId, id).subscribe((res: any) => {
      if (res) {
        this.toaster.success(res.message);
        this.getAppDataById();
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
    })
  }
  // deleteGroupById(id: any) {
  //   this.loader.start();
  //   this.appsListService.deleteGroup(this.appId, id).subscribe((res: any) => {
  //     if (res) {
  //       this.toaster.success(res.message);
  //       this.getAppDataById();
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop();
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })
  // }

  deleteCategoryById(id: any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.loader.start();
        this.appsListService.deleteCategory(this.appId, id).subscribe((res: any) => {
          if (res) {
            this.toaster.success(res.message);
            this.getAppDataById();
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
    })
  }
  // deleteCategoryById(id: any) {
  //   this.loader.start();
  //   this.appsListService.deleteCategory(this.appId, id).subscribe((res: any) => {
  //     if (res) {
  //       this.toaster.success(res.message);
  //       this.getAppDataById();
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop();
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })
  // }

  // --------------Intro-------
deletePage(i:any,id:any){
  const modalRef = this.modalService.open(DeletePopupComponent, {
    size: 'l',
  })
  modalRef.result.then((result:any)=>{
    if(result){
      this.loader.start();
      this.pagesListData.splice(i, 1);
      this.pagesListData.forEach((ele: any, index: any) => {
        ele['sequence'] = index;

      })

      this.pagesListData.forEach((ele: any, index: any) => {
        ele['sequence'] = index;

        if (ele.questioner) {

          if (ele.questioner.questions && ele.questioner.questions.length) {

            let temp: any = [];
            ele.questioner.questions.forEach((element: any) => {
              let obj = {
                id: element.id._id,
                sequence: element.sequence
              }

              temp.push(obj);
            });

            ele.questioner.questions = [...temp];
          }

        }

      })

      let payload = {
        page: this.pagesListData,
        deletedPage : [id]
      }
      this.AppService.updateApp(payload, this.appId).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success('Deleted Successfully');
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
  })
}
  // deletePage(i: any) {
  //   this.loader.start();
  //   this.pagesListData.splice(i, 1);
  //   this.pagesListData.forEach((ele: any, index: any) => {
  //     ele['sequence'] = index;

  //   })

  //   this.pagesListData.forEach((ele: any, index: any) => {
  //     ele['sequence'] = index;

  //     if (ele.questioner) {

  //       if (ele.questioner.questions && ele.questioner.questions.length) {

  //         let temp: any = [];
  //         ele.questioner.questions.forEach((element: any) => {
  //           let obj = {
  //             id: element.id._id,
  //             sequence: element.sequence
  //           }

  //           temp.push(obj);
  //         });

  //         ele.questioner.questions = [...temp];
  //       }

  //     }

  //   })

  //   let payload = {
  //     page: this.pagesListData
  //   }
  //   this.AppService.updateApp(payload, this.appId).subscribe((res: any) => {
  //     if (res.statusCode == 200) {
  //       this.toaster.success('Deleted Successfully');
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop();
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })

  // }

  editPageRoute(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/edit/' + id])
  }

  activeInActive(type: any, id: any, event: any, page: any, index: any) {

    let payload: any = {
      page: []
    }

    if (type == 'intro') {
      let obj = {
        intro: {
          active: event.target.checked,
          title: page.title,
          description: page.description,
          videolink: page.videolink,
          icon: page.icon
        },
        sequence: index
      }
      payload.page.push(obj);
    } else if (type == 'custom_template') {
      let obj = {
        custom_template: {
          active: event.target.checked,
          name: page.name,

        },
        sequence: index
      }
      payload.page.push(obj);
    } else if (type == 'section') {
      let obj = {
        section: {
          active: event.target.checked,
          title: page.title,

        },
        sequence: index
      }
      payload.page.push(obj);
    } else if (type == 'report') {
      let obj = {
        report: {
          active: event.target.checked,
          type: page.type,
          description: page.description

        },
        sequence: index
      }
      payload.page.push(obj);
    } else if (type == 'questioner') {
      let obj = {
        questioner: {
          active: event.target.checked,
          title: page.title,
          description: page.description,
          categories: page.categories?._id,
          group: page.group?._id,
          // tag :page.tag,
          hideTitle: page.hideTitle,
          multiColLayout: page.multiColLayout,
          overrideNextBtn: page.overrideNextBtn,
          questions: page.questions.map((ele: any) => ({ "id": ele.id._id, "sequence": ele.sequence })),
        },
        sequence: index
      }
      payload.page.push(obj);
    } else if (type == 'dynamic_question') {
      let obj = {
        dynamic_question: {
          active: event.target.checked,
          title: page.title,
          description: page.description,
          group: page.group?._id,
          template: page.template?._id

        },
        sequence: index
      }
      payload.page.push(obj);
    }

    this.loader.start();
    this.appsListService.editPagesType(this.appId, id, payload).subscribe((res: any) => {

      if (res.statusCode == 200) {
        this.toaster.success(res.message);
        this.loader.stop();
        this.getAppDataById();
      } else {
        event.target.checked = false;
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      event.target.checked = false;
      this.toaster.error(error);
      this.loader.stop();
    })

  }
deleteReport(id:any){
  const modalRef = this.modalService.open(DeletePopupComponent, {
    size: 'l',
  })
  modalRef.result.then((result:any)=>{
    if(result){
      this.loader.start();
    this.appsListService.deletePage(this.appId, id).subscribe((res: any) => {
      if (res) {
        this.toaster.success(res.message);
        this.getAppDataById();
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
  })
}
  // deleteReport(id: any) {
  //   this.loader.start();
  //   this.appsListService.deletePage(this.appId, id).subscribe((res: any) => {
  //     if (res) {
  //       this.toaster.success(res.message);
  //       this.getAppDataById();
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop();
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })
  // }

  viewQuestioner(id: any) {

    this.router.navigate(['apps/' + this.appId + '/page/view-edit/' + id])
  }
  // ----------------------Questioner Dynamic--------------------------------
  viewQuestionerDynamic(id: any) {
    this.router.navigate(['apps/' + this.appId + '/page/view-edit-questioner/' + id])
  }

  pages() {
    this.commonService.setSidebarToggle(false);
    this.router.navigate(['apps/' + this.appId + '/page/list'])
  }
  categories() {
    this.commonService.setSidebarToggle(false);
    this.router.navigate(['apps/' + this.appId + '/categories/list'])
  }
  groups() {
    this.commonService.setSidebarToggle(false);
    this.router.navigate(['apps/' + this.appId + '/groups/list'])
  }

  addPages() {
    this.router.navigate(['apps/' + this.appId + '/page/add']);
  }

  addCategories() {
    this.router.navigate(['apps/' + this.appId + '/categories/add'])
  }

  addGroups() {
    this.router.navigate(['apps/' + this.appId + '/groups/add'])
  }

  editCategory(id: any) {
    this.router.navigate(['apps/' + this.appId + '/categories/edit/' + id])
  }

  editGroup(id: any) {
    this.router.navigate(['apps/' + this.appId + '/groups/edit/' + id])
  }

  drop(event: CdkDragDrop<string[]>, data: any) {
    moveItemInArray(this.pagesListData, event.previousIndex, event.currentIndex);

    this.pagesListData.forEach((ele: any, index: any) => {
      ele['sequence'] = index;

      if (ele.questioner) {

        if (ele?.questioner?.questions && ele?.questioner?.questions.length) {

          let temp: any = [];
          ele?.questioner?.questions.forEach((element: any) => {
            let obj = {
              id: element.id._id,
              sequence: element.sequence
            }

            temp.push(obj);
          });

          ele.questioner.questions = [...temp];
        }

      }

    })

    let payload = {
      page: this.pagesListData
    }

    this.loader.start();
    this.AppService.updateApp(payload, this.appId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success('Sequence Updated');
        this.loader.stop();
        this.getAppDataById();
      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }

}
