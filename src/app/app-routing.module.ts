import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AuthGuard } from './guards/authguard.guard';
import {AdminguardGuard} from './guards/adminguard.guard'

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {
    path: 'home', 
    component: HomeComponent, canActivate:[AuthGuard],
    children:[
      {path: 'start', component: HomepageComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'profile', component:UserprofileComponent},
      {path: 'admin', component:AdminComponent, canActivate:[AdminguardGuard]},
      {path: 'shopping-cart', component:ShoppingcartComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
