import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersComponent,
    AddEditUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule

  ]
})
export class UsersModule { }
