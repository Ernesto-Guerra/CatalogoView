import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {    
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(["/signup"]);
            },
            error => {
                this.error = error;
                this.loading = false;
    });


    // this.service.login(this.login).subscribe(response =>{
    //   // console.log(response)

    //   if(response.hasOwnProperty('token')){
    //     console.log('Good')

    //     // Resto
    //     localStorage.setItem('data', JSON.stringify(response))

    //     console.log(JSON.parse(localStorage.getItem('data')).token)

    //   }
    //   else{
    //     console.log('Bad')
    //   }

    // })
  }

}
