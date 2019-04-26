import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  api: string = API;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(`${this.api}/students`);
  }

  delete(id){
    return this.http.delete(`${this.api}/students/${id}`)
  }

  show(id){
    return this.http.get<Student[]>(`${this.api}/students/${id}`)
  }

  update(student,id){
    return this.http.put(`${this.api}/students/${id}`,student)
  }
}
