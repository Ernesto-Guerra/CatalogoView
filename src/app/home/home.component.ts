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

  delete(id){
    if(confirm('¿Deseas eliminar a este estudiante con matricula '+id+'?')){
      this.studentService.delete(id).subscribe(response=>{
        if(response.hasOwnProperty('msg')){
          alert('El estudiante fue eliminado')
          console.log(this.students)          
        }
        else{
          alert('El estudiante no fue eliminado')
          console.log(response)
        }
      })
    }
    else{
      alert('El estudiante no fue eliminado')
    }
  }

  openEdit(student){
    
  }
}
