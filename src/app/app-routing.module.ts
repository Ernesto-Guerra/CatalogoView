import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'signup', 
    component: SignupComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]; 

@NgModule({
  imports:[
    RouterModule.forRoot(
      routes,{enableTracing:true}
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
