import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';
import { AddEditApp } from 'src/app/shared/models/app';
import { AppService } from 'src/app/shared/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-add-edit-apps',
  templateUrl: './add-edit-apps.component.html',
  styleUrls: ['./add-edit-apps.component.css']
})
export class AddEditAppsComponent implements OnInit {
  idOfApp: any
  addEditApp: AddEditApp = new AddEditApp();
  title = '';
  constructor(private appService: AppService,
    private loader: NgxUiLoaderService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.addEditApp = new AddEditApp();

    this.route.params.subscribe((params: any) => {

      if (params && params.appId) {
        this.idOfApp = params.appId;
      }

    })

    if (this.idOfApp) {

      this.title = 'Edit App';
      this.getAppData();

    } else {
      this.title = 'Add App';
    }

    this.commonService.setMainTitleToggle(this.title);
  }

  getAppData() {
    this.loader.start();
    this.appService.getAppById(this.idOfApp).subscribe((res: any) => {

      res.data.page.forEach((ele: any) => {

        if (ele.questioner) {
          ele.questioner.categories = ele.questioner?.categories?._id;
          ele.questioner.group = ele.questioner?.group?._id;

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

        }
        if (ele.dynamic_question) {
          ele.dynamic_question.group = ele.dynamic_question?.group?._id;

          if (ele.dynamic_question) {

            if (ele?.dynamic_question?.template && ele?.dynamic_question?.template?.template) {

              ele.dynamic_question.template = ele.dynamic_question.template._id
            }

          }
        }
      })
      this.addEditApp.name = res.data.name;
      this.addEditApp.icon = res.data.icon;
      this.addEditApp.title = res.data.title;
      this.addEditApp.active = res.data.active;
      this.addEditApp.type = res.data.type;
      this.addEditApp.group = res.data.group && res.data.group.length ?
        res.data.group.map((ele: any) => ele._id) : [];
      this.addEditApp.page = res.data.page;
      this.addEditApp.categories = res.data.categories && res.data.categories.length ?
        res.data.categories.map((ele: any) => ele._id) : [];

      this.loader.stop();
    })

  }
  update() {
    this.loader.start();
    if (this.addEditApp.name && this.addEditApp.title && this.addEditApp.type && this.addEditApp.icon) {
      this.appService.updateApp(this.addEditApp, this.idOfApp).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps']);
        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }

      }, (error) => {
        this.toaster.error(error);
        this.loader.stop();
      })
    } else {
      this.toaster.error('Please All The Fields');
      this.loader.stop();
    }

  }
  submit() {

    if (this.addEditApp.name && this.addEditApp.title && this.addEditApp.type && this.addEditApp.icon) {
      this.loader.start();
      this.appService.createApp(this.addEditApp).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success(res.message);
          this.loader.stop();
          this.router.navigate(['apps']);

        } else {
          this.toaster.error(res.message);
          this.loader.stop();
        }
      }, (error: any) => {
        this.toaster.error(error.error.message);
        this.loader.stop();
      })
    } else {
      this.toaster.warning('Please Enter all the Fields');
      this.loader.stop();
    }

  }
  cancel() {
    this.router.navigate(['apps'])
  }
}
