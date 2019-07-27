import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app-config'

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  api : String = API

  constructor(private http : HttpClient) { }

  sendData(data){
    return this.http.post(`${this.api}/signup`,data)
  }

}
