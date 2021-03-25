import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'business/login',
    component: LoginComponent
  },
  {
    path:'business/signup',
    component: SignupComponent
  },
  {
    path:'business/verify-account',
    component:VerifyAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
