import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
// import exportFromJSON from 'export-from-json'
import * as FileSaver from 'file-saver'
import * as json2xls from 'json2xls'
import * as XLSX from 'xlsx';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1
  nuevos: any
  title = 'Lista de Estudiantes';
  searchText;
  students: Student[] = [];
  table = null;
  student = {
    sex: null,
    grade: null
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

  add() {
    console.log("Agregar alumno")
    this.router.navigateByUrl('/student/add')
  }

  descargar() {
    var data = this.students
    var fileName = 'Lista_de_estudiantes'

    this.exportAsExcelFile(data, fileName)
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'test.xlsx');
    // this.saveAsExcelFile(excelBuffer, excelFileName);
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
      this.nuevos = jsonData.data
      console.log(this.nuevos)
      // this.actualizarTodos()
    }

    reader.readAsBinaryString(file);
  }

  actualizarTodos() {
    console.log('iniciado')

    this.nuevos.forEach(element => {
      var data = {
        "card": element.card,
        "first_name": element.first_name,
        "last_name": element.last_name,
        "major_id": element.major_id,
        "sex": element.sex,
        "grade": element.grade,
        "curp": element.curp
      }

      this.x2(data)
    });
    alert('Se han guardado los cambios')
    this.studentService.getAll().pipe(first()).subscribe(students => {
      this.students = students;
      console.log(this.students)
    });
  }

  x2(student){
    this.studentService.update(student,student.card).subscribe(response=>{
      console.log('Modificado')
    })
  }

  agregar() {
    console.log('Llega')
    console.log(this.student)

    if (this.student.sex == null || this.student.sex == '') {
      console.log('no hay genero')
      var genero = this.obtenerGenero(this.student)

      this.student.sex = genero

      console.log('Completo')
      console.log(this.student)
    }
    else {
      console.log('sí hay genero')
    }

    if (this.student.grade == null) {
      console.log('no hay grado')
      var grado = this.obtenerGrado(this.student)
      console.log('Completo')
      this.student.grade = grado
      console.log(this.student)
    }
    else {
      console.log('sí hay grado')
    }

    this.studentService.add(this.student).subscribe(response => {
      console.log(response)
      alert('Se agrego el estudiante')
      this.student = {
        sex: null,
        grade: null
      }
      this.router.navigateByUrl('/home')

    })
  }

  delete(id) {
    if (confirm('¿Deseas eliminar a este estudiante con matricula ' + id + '?')) {
      this.studentService.delete(id).subscribe(response => {
        if (response.hasOwnProperty('msg')) {
          alert('El estudiante fue eliminado')
          console.log(this.students)
          this.studentService.getAll().pipe(first()).subscribe(students => {
            this.students = students;
            console.log(this.students)
          });
        }
        else {
          alert('El estudiante no fue eliminado')
          console.log(response)
        }
      })
    }
    else {
      alert('El estudiante no fue eliminado')
    }
  }

  openEdit(student) {

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

    return genero
  }

  obtenerGrado(student) {

    var grado = 0
    // año de inscripcion
    var year = student.card.slice(0, 2)
    // periodo de inscripcion
    var cuatri = student.card.slice(2, 3)

    var date_now = new Date().toISOString()
    // año actual
    var year_now = parseInt(date_now.slice(2, 4))
    // cuatri actual
    var cuatri_now = parseInt(date_now.slice(5, 7))

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

    return grado
  }
}
