import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddEditAppsComponent } from './add-edit-apps/add-edit-apps.component';
import { AddEditPagesComponent } from './add-edit-pages/add-edit-pages.component';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { AppsListComponent } from './apps-list/apps-list.component';
import { AppsRoutingModule } from './apps-routing.module';
import { PagesListComponent } from './pages-list/pages-list.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ViewEditPageComponent } from './view-edit-page/view-edit-page.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditQuestionerDynamicComponent } from './add-edit-questioner-dynamic/add-edit-questioner-dynamic.component';
import { ReportPopupComponent } from './report-popup/report-popup.component';
import { StartReportComponent } from './start-report/start-report.component';
import { ViewEditQuestionerDynamicComponent } from './view-edit-questioner-dynamic/view-edit-questioner-dynamic.component';
import { VideoTagPopupComponent } from './video-tag-popup/video-tag-popup.component';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { ForgotEmailPopupComponent } from './forgot-email-popup/forgot-email-popup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppsListComponent,
    AddEditAppsComponent,
    PagesListComponent,
    AddEditPagesComponent,
    ReportsListComponent,
    ViewEditPageComponent,
    AddEditQuestionComponent,
    ReportPopupComponent,
    StartReportComponent,
    ViewEditQuestionerDynamicComponent,
    AddEditQuestionerDynamicComponent,
    VideoTagPopupComponent,
    DeletePopupComponent,
    ForgotEmailPopupComponent,
    ForgotPasswordComponent,

    // DateFormatWithTimeZonePipe,
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    SharedModule,
    DragDropModule,

  ],

  providers:[DatePipe]
})
export class AppsModule { }
