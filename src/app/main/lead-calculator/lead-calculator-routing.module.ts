import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAnnualGoalComponent } from './add-edit-annual-goal/add-edit-annual-goal.component';
import { AddEditAverageSalePriceComponent } from './add-edit-average-sale-price/add-edit-average-sale-price.component';
import { AddEditAverageSaleRequiredComponent } from './add-edit-average-sale-required/add-edit-average-sale-required.component';
import { AddEditLeadsRequiredComponent } from './add-edit-leads-required/add-edit-leads-required.component';
import { AddEditSaleConversionComponent } from './add-edit-sale-conversion/add-edit-sale-conversion.component';
import { ChannelsComponent } from './channels/channels.component';
import { LeadSummaryComponent } from './lead-summary/lead-summary.component';
import { ListLeadCalComponent } from './list-lead-cal/list-lead-cal.component';


const routes: Routes = [
  {
    path: '',
    component: ListLeadCalComponent
  },
  {
    path: 'add-edit-annualGoal/:reportName',
    component: AddEditAnnualGoalComponent
  },
  {
    path: 'add-edit-annualGoal/report/:id',
    component: AddEditAnnualGoalComponent
  },
  {
    path: 'add-edit-averageSalePrice/:reportName',
    component: AddEditAverageSalePriceComponent
  },
  {
    path: 'add-edit-averageSalePrice/report/:id',
    component: AddEditAverageSalePriceComponent
  },
  {
    path: 'add-edit-averageSaleRequired/:reportName',
    component: AddEditAverageSaleRequiredComponent
  },
  {
    path: 'add-edit-averageSaleRequired/report/:id',
    component: AddEditAverageSaleRequiredComponent
  },
  {
    path: 'add-edit-leadsRequired/:reportName',
    component: AddEditLeadsRequiredComponent
  },
  {
    path: 'add-edit-leadsRequired/report/:id',
    component: AddEditLeadsRequiredComponent
  },
  {
    path: 'add-edit-saleConversion/:reportName',
    component: AddEditSaleConversionComponent
  },
  {
    path: 'add-edit-saleConversion/report/:id',
    component: AddEditSaleConversionComponent
  },
  {
    path: 'channels/:reportName',
    component: ChannelsComponent
  },
  {
    path: 'channels/report/:id',
    component: ChannelsComponent
  },
  {
    path: 'lead-summary/:reportName',
    component: LeadSummaryComponent
  },
  {
    path: 'lead-summary/report/:id',
    component: LeadSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadCalculatorRoutingModule { }
