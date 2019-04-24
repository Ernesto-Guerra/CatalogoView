import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service'
import { signupData } from './signupData'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup= new signupData('','','','')
  
  constructor(private service : SignupService) {  }

  
  ngOnInit() {
  }

  test(){
    console.log(this.signup)
  }

  sendData(){
    this.service.sendData(this.signup).subscribe(response =>{
      console.log(response)
    })
  }

}
