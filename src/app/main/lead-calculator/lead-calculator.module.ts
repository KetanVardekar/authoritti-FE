import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditAnnualGoalComponent } from './add-edit-annual-goal/add-edit-annual-goal.component';
import { AddEditAverageSalePriceComponent } from './add-edit-average-sale-price/add-edit-average-sale-price.component';
import { AddEditAverageSaleRequiredComponent } from './add-edit-average-sale-required/add-edit-average-sale-required.component';
import { AddEditLeadsRequiredComponent } from './add-edit-leads-required/add-edit-leads-required.component';
import { AddEditSaleConversionComponent } from './add-edit-sale-conversion/add-edit-sale-conversion.component';
import { ChannelsComponent } from './channels/channels.component';
import { LeadCalculatorRoutingModule } from './lead-calculator-routing.module';
import { LeadSummaryComponent } from './lead-summary/lead-summary.component';
import { ListLeadCalComponent } from './list-lead-cal/list-lead-cal.component';



@NgModule({
  declarations: [
    ListLeadCalComponent,
    AddEditAnnualGoalComponent,
    AddEditAverageSalePriceComponent,
    AddEditAverageSaleRequiredComponent,
    AddEditLeadsRequiredComponent,
    AddEditSaleConversionComponent,
    LeadSummaryComponent,
    ChannelsComponent
  ],
  imports: [
    CommonModule,
    LeadCalculatorRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    NgxPrintModule
  ],
  providers:[DatePipe]
})
export class LeadCalculatorModule { }
