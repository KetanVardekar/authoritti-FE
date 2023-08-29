import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './main/apps/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { StopAuthGuard } from './shared/guards/stop-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [StopAuthGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    canActivate: [StopAuthGuard],
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule),
    data: { title: 'SignUp' }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    data: { title: 'Authoritti' }
  },
  {
    path: ':emailId/forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
