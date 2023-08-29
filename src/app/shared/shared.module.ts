import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './Component/header/header.component';

import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { MultiChoiceComponent } from './Component/multi-choice/multi-choice.component';
import { MultiTextInputComponent } from './Component/multi-text-input/multi-text-input.component';
import { SingleChoiceComponent } from './Component/single-choice/single-choice.component';
import { SliderComponent } from './Component/slider/slider.component';
import { TextAreaComponent } from './Component/text-area/text-area.component';
import { TextInputComponent } from './Component/text-input/text-input.component';
import { IntroComponent } from './Component/intro/intro.component';
import { SectionComponent } from './Component/section/section.component';
import { QuestionerComponent } from './Component/questioner/questioner.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RemovewhitespacesPipe } from './pipes/remove-white-space';
import { FormsModule } from '@angular/forms';
import { ArcTypeComponent } from './Component/arc-type/arc-type.component';
// import { DriverComponent } from './Component/driver/driver.component';
// import { EmotionsComponent } from './Component/emotions/emotions.component';
import { FinancialGoalsComponent } from './Component/financial-goals/financial-goals.component';
// import { NaturalGiftsComponent } from './Component/natural-gifts/natural-gifts.component';
import { SimpleComponent } from './Component/simple/simple.component';
// import { SkillsComponent } from './Component/skills/skills.component';

import { NgxPrintModule } from 'ngx-print';
import { EgoisticTypeComponent } from './Component/egoistic-type/egoistic-type.component';
import { TraitTypeComponent } from './Component/trait-type/trait-type.component';
import { SkillTypeComponent } from './Component/skill-type/skill-type.component';
import { DateFormatWithTimeZonePipe } from './pipes/dateFormatWithTimeZone';
import { QuestionerDynamicComponent } from './Component/questioner-dynamic/questioner-dynamic.component';
import { MultiChoiceDynamicComponent } from './Component/multi-choice-dynamic/multi-choice-dynamic.component';
import { SliderDynamicComponent } from './Component/slider-dynamic/slider-dynamic.component';
import { TableDropDownDynamicComponent } from './Component/table-drop-down-dynamic/table-drop-down-dynamic.component';
import { TableSkillDynamicComponent } from './Component/table-skill-dynamic/table-skill-dynamic.component';
import { TableSkillTraitDynamicComponent } from './Component/table-skill-trait-dynamic/table-skill-trait-dynamic.component';
import { TableTraitDynamicComponent } from './Component/table-trait-dynamic/table-trait-dynamic.component';
import { TableYesNoDynamicComponent } from './Component/table-yes-no-dynamic/table-yes-no-dynamic.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmotionsComponent } from './Component/template/emotions/emotions.component';
import { GoalsComponent } from './Component/template/goals/goals.component';
import { PassionComponent } from './Component/template/passion/passion.component';
import { ProfessionComponent } from './Component/template/profession/profession.component';
import { AddEditStepComponent } from './Component/template/goals/add-edit-step/add-edit-step.component';
import { AddEditGoalComponent } from './Component/template/goals/add-edit-goal/add-edit-goal.component';
import { SafePipe } from './pipes/safePipe';
import { PrintReportComponent } from './Component/print-report/print-report.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MultiChoiceComponent,
    MultiTextInputComponent,
    SingleChoiceComponent,
    SliderComponent,
    TextAreaComponent,
    TextInputComponent,
    IntroComponent,
    SectionComponent,
    QuestionerComponent,
    RemovewhitespacesPipe,
    DateFormatWithTimeZonePipe,
    SafePipe,
    ArcTypeComponent,
    FinancialGoalsComponent,
    SimpleComponent,
    EgoisticTypeComponent,
    TraitTypeComponent,
    SkillTypeComponent,
    QuestionerDynamicComponent,
    MultiChoiceDynamicComponent,
    SliderDynamicComponent,
    TableDropDownDynamicComponent,
    TableSkillDynamicComponent,
    TableSkillTraitDynamicComponent,
    TableTraitDynamicComponent,
    TableYesNoDynamicComponent,
    EmotionsComponent,
    GoalsComponent,
    PassionComponent,
    ProfessionComponent,
    AddEditStepComponent,
    AddEditGoalComponent,
    PrintReportComponent,
  ],

  imports: [
    CommonModule,
    NgxSliderModule,
    FormsModule,
    NgxPrintModule,
    NgSelectModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PrintReportComponent,
    IntroComponent,
    MultiChoiceComponent,
    MultiTextInputComponent,
    SectionComponent,
    SingleChoiceComponent,
    SliderComponent,
    TextAreaComponent,
    TextInputComponent,
    QuestionerComponent,
    ArcTypeComponent,
    QuestionerDynamicComponent,
    FinancialGoalsComponent,
    EgoisticTypeComponent,
    TraitTypeComponent,
    SkillTypeComponent,
    SimpleComponent,
    MultiChoiceDynamicComponent,
    SliderDynamicComponent,
    TableDropDownDynamicComponent,
    TableSkillDynamicComponent,
    TableSkillTraitDynamicComponent,
    TableTraitDynamicComponent,
    TableYesNoDynamicComponent,
    RemovewhitespacesPipe,
    SafePipe,
    DateFormatWithTimeZonePipe,
    EmotionsComponent,
    GoalsComponent,
    PassionComponent,
    ProfessionComponent,
  ]
})
export class SharedModule { }
