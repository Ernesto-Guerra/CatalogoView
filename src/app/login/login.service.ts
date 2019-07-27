import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app-config'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api : String = API
  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(`${this.api}/login`,data)
  }
}
