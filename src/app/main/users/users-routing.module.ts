import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { UsersComponent } from './users/users.component';



const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'add',
    component: AddEditUsersComponent
  },
  {
    path: 'edit/:id',
    component: AddEditUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
