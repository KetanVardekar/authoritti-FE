import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintReportComponent } from 'src/app/shared/Component/print-report/print-report.component';
import { AddEditAppsComponent } from './add-edit-apps/add-edit-apps.component';
import { AddEditPagesComponent } from './add-edit-pages/add-edit-pages.component';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { AddEditQuestionerDynamicComponent } from './add-edit-questioner-dynamic/add-edit-questioner-dynamic.component';
import { AppsListComponent } from './apps-list/apps-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { PagesListComponent } from './pages-list/pages-list.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { StartReportComponent } from './start-report/start-report.component';
import { ViewEditPageComponent } from './view-edit-page/view-edit-page.component';
import { ViewEditQuestionerDynamicComponent } from './view-edit-questioner-dynamic/view-edit-questioner-dynamic.component';


const routes: Routes = [
  {
    path: '',
    component: AppsListComponent
  },
  {
    path: 'add',
    component: AddEditAppsComponent
  },


  {
    path: 'edit/:appId',
    component: AddEditAppsComponent
  },
  {
    path: ':appId/page/list',
    component: PagesListComponent
  },
  {
    path: ':appId/categories/list',
    component: PagesListComponent
  },
  {
    path: ':appId/groups/list',
    component: PagesListComponent
  },
  {
    path: ':appId/page/add',
    component: AddEditPagesComponent
  },
  {
    path: ':appId/categories/add',
    component: AddEditPagesComponent
  },
  {
    path: ':appId/groups/add',
    component: AddEditPagesComponent
  },
  {
    path: ':appId/page/edit/:id',
    component: AddEditPagesComponent
  },
  {
    path: ':appId/categories/edit/:id',
    component: AddEditPagesComponent
  },
  {
    path: ':appId/groups/edit/:id',
    component: AddEditPagesComponent
  },

  {
    path : ':appId/page/view-edit/:id',
    component : ViewEditPageComponent
  },
  {
    path : ':appId/page/view-edit-questioner/:id',
    component : ViewEditQuestionerDynamicComponent
  },
  {
    path : ':appId/page/questioner-dynamic/add/:pageId',
    component : AddEditQuestionerDynamicComponent
  },
  {
    path : ':appId/page/:pageId/questioner-dynamic/edit/:id',
    component : AddEditQuestionerDynamicComponent
  },
  // {
  //   path: ':appId/page/question/add/:id',
  //   component : AddEditQuestionComponent
  // },
  {
    path: ':appId/page/:pageId/question/add',
    component : AddEditQuestionComponent
  },
  {
    path: ':appId/page/:pageId/question/edit/:id',
    component : AddEditQuestionComponent
  },
  {
    path: ':appId/reports',
    component: ReportsListComponent
  },

  {
    path: ':appId/reports/start-report/edit/:id',
    component: StartReportComponent
  },
  {
    path: ':appId/reports/start-report/add/:reportName',
    component: StartReportComponent
  },
  {
    path: ':appId/print-report/:id',
    component: PrintReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
