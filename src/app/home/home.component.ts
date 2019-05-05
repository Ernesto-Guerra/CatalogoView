import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p : number = 1
  title = 'Lista de Estudiantes';
  searchText;
  students: Student[] = [];
  table = null;
  student = {}

  constructor(
    private studentService: StudentService,
    public router: Router
    ) { }

  ngOnInit() {
    this.studentService.getAll().pipe(first()).subscribe(students => {
      this.students = students;
      console.log(this.students)
    });
    
    this.table = document.getElementById('buscar')
  }

  add(){
    console.log("Agregar alumno")
    this.router.navigateByUrl('/student/add')
  }

  agregar(){
    console.log('Llega')
    console.log(this.student)
        this.studentService.add(this.student).subscribe(response => {
          console.log(response)
          alert('Se agrego el estudiante')
          this.student={}
          location.replace('/home')
        })
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
