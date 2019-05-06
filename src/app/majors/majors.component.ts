import { Component, OnInit } from '@angular/core';
import { MajorService } from '../services/major.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Major } from '../models/major';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css']
})
export class MajorsComponent implements OnInit {

  constructor(
    private majorService: MajorService,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) { }

  major = {}
  majors: Major[] = []
  students: Student[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.majorService.getAll().pipe(first()).subscribe(majors => {
        console.log(majors)
        this.majors = majors
      });
    })
  }

  filter() {
    console.log(this.major)
    //obtener con get los alumnos de las carreras
    this.studentService.getAllByMajor(this.major).pipe(first()).subscribe(students => {
      this.students = students;
      console.log(this.students)
      //entonces redirigir a home con esos alumnos para mostrar
      //ver como mandar un arreglo a otra vista
      //y mostrar los datos enviados solamente
      //////////
      ///Solo es una idea
    });      
  }

}
