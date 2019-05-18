import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient) { }
  api : String = API

  get(id){
    return this.http.get(`${this.api}/images/${id}`)
  }

  delete(id){
    return this.http.delete(`${this.api}/images/${id}`)
  }

  create(data){
    return this.http.post(`${this.api}/images`,data)
  }
}
