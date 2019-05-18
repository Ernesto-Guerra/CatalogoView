import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EditStudentComponent } from './edit-student/edit-student.component'

import { AuthGuard } from './guards/auth.guard';
import { MajorsComponent } from './majors/majors.component';
import { ClassesComponent } from './classes/classes.component';
import { EditClassesComponent } from './edit-classes/edit-classes.component'
import { ImagesComponent } from './images/images.component'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
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
    path: 'majors', 
    component: MajorsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'classes', 
    component: ClassesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'classes/:id',
    component : EditClassesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'images',
    component : ImagesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'signup', 
    component: SignupComponent
  },
  {
    path:'student/:id',
    component : EditStudentComponent
  },
  {
    path:'student/add',
    component : EditStudentComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
  
]; 

@NgModule({
  imports:[
    RouterModule.forRoot(
      routes,{enableTracing:false}
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
