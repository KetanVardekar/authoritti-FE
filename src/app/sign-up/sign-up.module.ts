import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule
  ]
})
export class SignUpModule { }
