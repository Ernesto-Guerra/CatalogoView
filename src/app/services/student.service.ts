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
}
