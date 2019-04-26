import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  id = null

  student = {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']

      this.studentService.show(this.id).subscribe(response => {
        console.log(response)
        this.student = response
      })
    })
  }

  save() {
    if (confirm('¿Guardar cambios?')) {
      this.studentService.update(this.student, this.id).subscribe(response => {
        console.log(response)
        alert('Se guardaron los cambios')
        location.replace('/home')
      })
    }
    else {
      alert('No se guardaron los cambios')
    }
  }

}
