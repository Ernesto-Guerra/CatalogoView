import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

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
  student = {
    sex:null,
    grade:null
  }

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
    
    if(this.student.sex==null || this.student.sex==''){
      console.log('no hay genero')
      var genero = this.obtenerGenero(this.student)

      this.student.sex=genero

      console.log('Completo')
    console.log(this.student)
    }
    else{
      console.log('sí hay genero')
    }
    
    if(this.student.grade==null){
      console.log('no hay grado')            
      var grado = this.obtenerGrado(this.student)
      console.log('Completo')
      this.student.grade=grado
    console.log(this.student)
    }
    else{
      console.log('sí hay grado')
    }

        this.studentService.add(this.student).subscribe(response => {
          console.log(response)
          alert('Se agrego el estudiante')
          this.student={
            sex:null,
            grade:null
          }
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

  obtenerGenero(student){
    var genero = student.curp.charAt(10)

    if(genero == 'H' || genero == 'h'){
      genero = 'hombre'
    }
    else if(genero == 'M' || genero == 'm'){
      genero = 'mujer'
    }
    else{
      genero = 'N/A'
    }

    // console.log(genero)
    return genero
  }

  obtenerGrado(student){

    var grado = 0
    // año de inscripcion
    var year = student.card.slice(0,2)
    // periodo de inscripcion
    var cuatri = student.card.slice(2,3)

    // console.log(year)
    // console.log(cuatri)

    var date_now = new Date().toISOString()
    // año actual
    var year_now = parseInt(date_now.slice(2,4))
    // cuatri actual
    var cuatri_now = parseInt(date_now.slice(5,7))

    // console.log(date_now)
    // console.log(year_now)
    // console.log(cuatri_now);
    

    if(cuatri_now<=4){
      cuatri_now=1
    }
    else if(cuatri_now<=8){
      cuatri_now=2
    }
    else{
      cuatri_now=3
    }
      
      for (let i = year; i <= year_now; i++) {
        for (let j = 1; j <= 3; j++) {          
          
          if(i==year_now){
            if(j<cuatri){
              break;
            }
            grado = grado + 1
          }
          else{
            grado = grado + 1
          }
          
        }
      }
     
      // console.log('El cuatrimestre es: '+grado) 
      return grado
  }
}
