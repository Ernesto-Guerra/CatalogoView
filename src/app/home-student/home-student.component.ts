import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/app-config'

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {

  constructor(private http : HttpClient) { }

  api: string = API;

  user={
    email:'default',
    name:'default'
  }

  ngOnInit() {
    var id = JSON.parse(localStorage.getItem('user')).user_id
    console.log(id)
    this.http.get(`${this.api}/user-id/${id}`).subscribe(response=>{
      this.user.email=response[0].email
      this.user.name=response[0].first_name.slice(0,6)
    })
  }

}
