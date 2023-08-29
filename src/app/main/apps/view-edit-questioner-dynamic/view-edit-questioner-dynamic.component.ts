import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { multiChoiceGroup } from 'src/app/shared/models/pages';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
@Component({
  selector: 'app-view-edit-questioner-dynamic',
  templateUrl: './view-edit-questioner-dynamic.component.html',
  styleUrls: ['./view-edit-questioner-dynamic.component.css']
})
export class ViewEditQuestionerDynamicComponent implements OnInit {
  multiChoiceGroupPayload: multiChoiceGroup = new multiChoiceGroup();
  appId: any;
  id: any;
  templateList: any;
  templateId: any;
  active: any;
  group:any;
  questionerDynamicTitle: any;
  questionerDynamicDesc:any
  title = '';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private appsListService: AppListService,
    private commonService:CommonService) { }

  ngOnInit(): void {

    this.title = 'View Dynamic Questionnaire';
    this.commonService.setMainTitleToggle(this.title);

    this.route.params.subscribe((params: any) => {

      if (params) {
        this.appId = params.appId;
        this.id = params.id;
        if(this.appId && this.id){
          this.getPageData();
        }
      }
    })
  }

  routeBack(){
    this.router.navigate(['/' + 'apps/' + this.appId + '/page/list']);
  }

  getPageData() {
    this.loader.start();
    this.appsListService.getPageById(this.appId, this.id).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.active = res.data.dynamic_question.active;
        this.questionerDynamicTitle = res.data.dynamic_question.title;
        this.questionerDynamicDesc =  res.data.dynamic_question.description

        this.group = res.data.dynamic_question.group?.name
        this.templateList = res.data.dynamic_question.template;

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
  addTemplate() {
    if (this.templateList) {
      this.toaster.warning('You can add only one Template ')
    } else {
      this.router.navigate(['apps/' + this.appId + '/page/questioner-dynamic/add/' + this.id])
    }
  }
  editMultipleChoiceGroup(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])

  }
  editSlider(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])

  }
  editTableDropDown(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])

  }
  editTableSkill(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])

  }
  editTableSkillTrait(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])

  }
  editTableTrait(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])

  }
  editTableYesNo(templateId: any) {
    this.router.navigate(['apps/' + this.appId + '/page/' + this.id + '/questioner-dynamic/edit/' + templateId])
  }
  deleteTemplate(templateId: any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.loader.start();
    this.appsListService.deleteTemplateById(this.appId, this.id, templateId).subscribe((res: any) => {
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
    })
  }


  editQuestionerDynamic() {
    this.router.navigate(['apps/' + this.appId + '/page/edit/' + this.id])
  }
}
