import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login={}

  constructor(private service : LoginService) { }

  ngOnInit() {
  }

  loginData(){
    this.service.login(this.login).subscribe(response =>{
      console.log(response)

      if(response.hasOwnProperty('token')){
        console.log('Good')

        // Resto

      }
      else{
        console.log('Bad')
      }

    })
  }

}
