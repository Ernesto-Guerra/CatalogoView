import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../models/student';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' :'application/json',
    'authorization' : `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  api: string = API;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(`${this.api}/students`,httpOptions);
  }

  delete(id){
    return this.http.delete(`${this.api}/students/${id}`,httpOptions)
  }

  show(id){
    return this.http.get(`${this.api}/students/${id}`,httpOptions)
  }

  update(student,id){
    return this.http.put(`${this.api}/students/${id}`,student,httpOptions)
  }
}
