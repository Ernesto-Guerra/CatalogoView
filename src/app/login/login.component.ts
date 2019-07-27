import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { StudentService } from '../services/student.service'
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
    private authenticationService: AuthenticationService,
    private studentService : StudentService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
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
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              console.log(this.f.email.value)
              var email = this.f.email.value
              var temp : any              
              var user : any
              this.studentService.getByMail(email).subscribe(response=>{
                // console.log(response)
                temp = response[0]

                console.log(temp)
                user = {
                  user_id : temp.id,
                  user_type : temp.user_type,
                  card : temp.first_name                  
                }
                // console.log(user)

                localStorage.setItem('user',JSON.stringify(user))

                switch (user.user_type) {
                  // Maestro
                  case 1:
                    
                    break;
                
                    // Guardia 
                  case 2:
                      this.router.navigate(["/home"]);
                    break;

                    // Administrador
                  case 3:

                    break;

                    // Estudiante
                  case 4:
                      this.router.navigate(["/inicio"]);
                    break;
                  default:
                    break;
                }
              })                
            },
            error => {
                this.error = error.statusText;
                this.loading = false;
    });
  }

}
