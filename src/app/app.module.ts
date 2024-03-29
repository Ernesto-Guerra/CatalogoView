import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './signup/signup.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { ErrorInterceptor} from './helpers/error.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MajorsComponent } from './majors/majors.component';
import { ClassesComponent } from './classes/classes.component';
import { EditClassesComponent } from './edit-classes/edit-classes.component';
import { ImagesComponent } from './images/images.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { MajorClassesComponent } from './major-classes/major-classes.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { StudentClassesComponent } from './student-classes/student-classes.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NavbarStudentComponent } from './navbar-student/navbar-student.component'; 
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    EditStudentComponent,
    MajorsComponent,
    ClassesComponent,
    EditClassesComponent,
    ImagesComponent,
    TakePhotoComponent,
    MajorClassesComponent,
    HomeStudentComponent,
    StudentClassesComponent,
    NavbarAdminComponent,
    HomeAdminComponent,
    NavbarStudentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SignupService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
