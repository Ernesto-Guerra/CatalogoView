import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  api: string = API;
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`${this.api}/classes`)
  }

  create(classs){
    return this.http.post(`${this.api}/classes`,classs)
  }

  delete(id){
    return this.http.delete(`${this.api}/classes/${id}`)
  }

  show(id){
    return this.http.get(`${this.api}/classes/${id}`)
  }

  update(id,classs){
    return this.http.put(`${this.api}/classes/${id}`,classs)
  }
}
