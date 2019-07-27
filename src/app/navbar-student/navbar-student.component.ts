import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css']
})
export class NavbarStudentComponent implements OnInit {

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
  }

  cerrar(){
    this.auth.logout()
  }

}
