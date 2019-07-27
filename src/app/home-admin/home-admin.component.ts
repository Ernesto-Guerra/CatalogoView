import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/app-config'

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  api: string = API;

  user={
    email:'default',
    name:'default'
  }
  constructor(private http : HttpClient) { }

  ngOnInit() {
    var id = JSON.parse(localStorage.getItem('user')).user_id
    console.log(id)
    this.http.get(`${this.api}/user-id/${id}`).subscribe(response=>{
      this.user.email=response[0].email
      this.user.name=response[0].first_name
    })
  }

}
