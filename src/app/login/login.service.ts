import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post('https://catalogoestudiantes.herokuapp.com/api/v1/login',data)
  }
}
