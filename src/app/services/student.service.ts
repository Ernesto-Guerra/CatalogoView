import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../models/student';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  api: string = API;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(`${this.api}/students`);
  }

  getAllByMajor(id){
    return this.http.get<Student[]>(`${this.api}/students/major/${id}`);
  }

  delete(id) {
    return this.http.delete(`${this.api}/students/${id}`)
  }

  show(id) {
    return this.http.get<Student[]>(`${this.api}/students/${id}`)
  }

  update(student, id) {
    console.log(student)
    return this.http.put(`${this.api}/students/${id}`, student)
  }

  /** POST: add a new hero to the database */
  add(student) {
    console.log(student)
    return this.http.post<Student>(`${this.api}/students`, student)
  }

  getByMail(email){
    return this.http.get(`${this.api}/user-mail/${email}`)
  }
}
