import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { SignupService } from '../signup/signup.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MajorService } from '../services/major.service';
import { first } from 'rxjs/operators';
import { Major } from '../models/major';
import { signupData } from '../signup/signupData';
import { Student } from '../models/student';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private majorService: MajorService,
    private route: ActivatedRoute,
    private router: Router,
    private signupService: SignupService
  ) { }

  id = null
  student = new Student()
  temp: any
  majors: Major[] = []
  modify = true
  muchos: any

  signup = new signupData('', '', '', '')

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] == "add") {
        console.log("test")
        this.modify = false
      } else {

        this.id = +params['id']

        this.studentService.show(this.id).subscribe(response => {
          console.log(response)
          this.temp = response
          this.student = this.temp
        })
      }

      this.majorService.getAll().pipe(first()).subscribe(majors => {
        console.log(majors)
        this.majors = majors
      });
    })

  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var dataString = JSON.stringify(jsonData)
      console.log(name)
      dataString = '{ "lista":' + dataString.slice(33, dataString.length)
      dataString = JSON.parse(dataString).lista
      console.log(dataString.length)
      this.muchos = dataString
    }
    reader.readAsBinaryString(file);
  }

  guardarTodos() {
    console.log('iniciado')
    this.guardarMuchos(this.muchos)
  }

  async guardarMuchos(students) {
    for (let index = 0; index < students.length; index++) {
      var element = students[index];
      console.log('Guardando estudiante ' + index + ' de ' + students.length)
      await this.saveLow({
        card: element.card,
        first_name: element.first_name,
        last_name: element.last_name,
        major_id: element.major_id,        
        curp: element.curp        
      })
    }
  }

  async saveLow(student) {
    student.grade = this.obtenerGrado(student)
    student.sex = this.obtenerGenero(student)
    // console.log(student)
    this.studentService.add(student).subscribe(response => {
      // console.log(response)
      // console.log(student.card)
      this.signup.email = `${student.card}@upchiapas.edu.mx`
      this.signup.first_name = `${student.card}-${student.major_id}`
      this.signup.password = `${student.card}`
      this.signup.user_type_id = '4'

      this.signupService.sendData(this.signup).subscribe(response => {
        //NADA POR AHORA
        console.log('Guardado')
        return
      })
    })

  }

  save(student) {
    console.log(student)
    if (confirm('¿Guardar cambios?')) {


      student.grade = this.obtenerGrado(student)
      student.sex = this.obtenerGenero(student)
      console.log(student)
      if (this.modify) {
        this.studentService.update(student, this.id).subscribe(response => {
          console.log(response)
          alert('Se guardaron los cambios')
          this.router.navigateByUrl(`/images/${this.id}`)
        })
      } else {
        console.log("entro")
        this.studentService.add(student).subscribe(response => {
          console.log(response)
          this.signup.email = `${this.student.card}@upchiapas.edu.mx`
          this.signup.first_name = `${this.student.card}-${this.student.major_id}`
          this.signup.password = `${this.student.card}`
          this.signup.user_type_id = '4'

          this.signupService.sendData(this.signup).subscribe(response => {
            //NADA POR AHORA
          })
          alert('Se agrego el estudiante')
          this.router.navigateByUrl(`/take-photo/${student.card}`)
        })
      }
    }
    else {
      alert('No se guardaron los cambios')
    }
  }

  obtenerGenero(student) {
    var genero = student.curp.charAt(10)

    if (genero == 'H' || genero == 'h') {
      genero = 'hombre'
    }
    else if (genero == 'M' || genero == 'm') {
      genero = 'mujer'
    }
    else {
      genero = 'N/A'
    }

    // console.log(genero)
    return genero
  }

  obtenerGrado(student) {

    var grado = 0
    // año de inscripcion
    var year = student.card.slice(0, 2)
    // periodo de inscripcion
    var cuatri = student.card.slice(2, 3)

    // console.log(year)
    // console.log(cuatri)

    var date_now = new Date().toISOString()
    // año actual
    var year_now = parseInt(date_now.slice(2, 4))
    // cuatri actual
    var cuatri_now = parseInt(date_now.slice(5, 7))

    // console.log(date_now)
    // console.log(year_now)
    // console.log(cuatri_now);


    if (cuatri_now <= 4) {
      cuatri_now = 1
    }
    else if (cuatri_now <= 8) {
      cuatri_now = 2
    }
    else {
      cuatri_now = 3
    }

    for (let i = year; i <= year_now; i++) {
      for (let j = 1; j <= 3; j++) {

        if (i == year_now) {
          if (j < cuatri) {
            break;
          }
          grado = grado + 1
        }
        else {
          grado = grado + 1
        }

      }
    }

    // console.log('El cuatrimestre es: '+grado) 
    return grado
  }

}
