import { Component, OnInit } from '@angular/core';

import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getAll().pipe(first()).subscribe(students => {
      this.students = students;
      console.log(this.students)
    });
  }

}
