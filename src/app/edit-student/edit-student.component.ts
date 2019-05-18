import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { MajorService } from '../services/major.service';
import { first } from 'rxjs/operators';
import { Major } from '../models/major';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private majorService: MajorService,
    private route: ActivatedRoute
  ) { }

  id = null

  student = {}

  majors: Major[] = []

  modify = true

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] == "add") {
        console.log("test")
        this.modify = false
      } else {

        this.id = +params['id']

        this.studentService.show(this.id).subscribe(response => {
          console.log(response)
          this.student = response
        })
      }

      this.majorService.getAll().pipe(first()).subscribe(majors => {
        console.log(majors)
        this.majors = majors
      });
    })

  }

  save(student) {
    if (confirm('¿Guardar cambios?')) {

      
      student.grade = this.obtenerGrado(student)
      student.sex = this.obtenerGenero(student)
      console.log(student)
      // if (this.disabled) {        
      //   this.studentService.update(this.student, this.id).subscribe(response => {
      //     console.log(response)
      //     alert('Se guardaron los cambios')
      //     location.replace('/home')
      //   })
      // } else {
      //   console.log("entro")
      //   this.studentService.add(this.student).subscribe(response => {
      //     console.log(response)
      //     alert('Se agrego el estudiante')
      //     location.replace('/home')
      //   })
      // }
    }
    else {
      alert('No se guardaron los cambios')
    }
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
