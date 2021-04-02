import { OrdersComponent } from './pages/orders/orders.component';
import { VoucherCardsComponent } from './pages/voucher-cards/voucher-cards.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BusinessesComponent } from './pages/businesses/businesses.component';
import { BuyersComponent } from './pages/buyers/buyers.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'business/login',
    component: LoginComponent,
  },
  {
    path: 'business/signup',
    component: SignupComponent,
  },
  {
    path: 'business/profile',
    component: ProfileComponent,
  },
  {
    path: 'product/categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/sub-categories/:id',
    component: SubCategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/add',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/edit/:id',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/my-products',
    component: MyProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'voucher/cards',
    component: VoucherCardsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'businesses',
    component: BusinessesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'buyers',
    component: BuyersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
