import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient } from '@angular/common/http';
import { createReadStream } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class StudentclassesService {

  api: string = API;

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get(`${this.api}/studentclass`)
  }

  getByCard(card){
    return this.http.get(`${this.api}/studentclass/${card}`)
  }

  create(data){
    return this.http.post(`${this.api}/studentclass`,data)
  }

  delete(id){
    return this.http.delete(`${this.api}/studentclass/${id}`)
  }
}
