import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config'
import { HttpClient } from '@angular/common/http';

import { Major } from '../models/major';


@Injectable({
  providedIn: 'root'
})
export class MajorService {
  api: string = API;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Major[]>(`${this.api}/majors`);
  }
}
