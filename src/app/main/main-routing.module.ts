import { LeadCalculatorModule } from './lead-calculator/lead-calculator.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { MainComponent } from './main.component';


const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: { title: 'Home' }
      },
      {
        path: 'leadCalculator',
        canActivate: [AuthGuard],
        loadChildren: () => import('./lead-calculator/lead-calculator.module').then(m => m.LeadCalculatorModule),
        data: { title: 'Lead Calculator' }
      },
      {
        path: 'apps',
        canActivate: [AuthGuard],
        loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule),
        data: { title: 'Apps' }
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: { title: 'Users' }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
