import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MajorclassesService {

  api: string = API;

  constructor(private http : HttpClient) { }

  get(id){
    return this.http.get(`${this.api}/majorclasses/${id}`)
  }

  create(data){
    return this.http.post(`${this.api}/majorclass`,data)
  }

  delete(id){
    return this.http.delete(`${this.api}/majorclass/${id}`)
  }
}
