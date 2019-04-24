import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient) { }

  sendData(data){
    return this.http.post('https://catalogoestudiantes.herokuapp.com/api/v1/signup',data)
  }

}
