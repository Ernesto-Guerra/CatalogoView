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

  disabled = true

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] == "add") {
        console.log("test")
        this.disabled = false
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

  save() {
    if (confirm('¿Guardar cambios?')) {

      if (this.disabled) {        
        this.studentService.update(this.student, this.id).subscribe(response => {
          console.log(response)
          alert('Se guardaron los cambios')
          location.replace('/home')
        })
      } else {
        console.log("entro")
        this.studentService.add(this.student).subscribe(response => {
          console.log(response)
          alert('Se agrego el estudiante')
          location.replace('/home')
        })
      }
    }
    else {
      alert('No se guardaron los cambios')
    }
  }

}
