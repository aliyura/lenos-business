import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BusinessesComponent } from './pages/businesses/businesses.component';
import { SubCategoiesComponent } from './pages/sub-categoies/sub-categoies.component';
import { BuyersComponent } from './pages/buyers/buyers.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    canActivate: [AuthGuard], 
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] 
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
    path:'product/categories',
    component:CategoriesComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'product/sub-categories',
    component:SubCategoiesComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'businesses',
    component:BusinessesComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'buyers',
    component:BuyersComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
