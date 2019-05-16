import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service'

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})


export class ClassesComponent implements OnInit {

  constructor(private classService : ClassService) { }
  
  classes = {}
  classs = {}
  grades = [1,2,3,4,5,6,7,8,9,10]
  ready = false

  ngOnInit() {
    this.classService.getAll().subscribe(response => {
      this.classes=response
      console.log(this.classes)
      this.ready = true
    })
  }

  agregar(){
    this.classService.create(this.classs).subscribe(response =>{
      console.log(response)
      this.classs = {}
      alert('Materia creada con exito')

      location.replace('/classes')
    })    
  }

  delete(id){
    if(confirm('¿Deseas eliminar esta materia?')){
      this.classService.delete(id).subscribe(response => {
        console.log(response)
        alert('Elemento eliminado con éxito')
        location.replace('/classes')
      })
    }    
    else{
      alert('No se ha eliminado la materia')
    }
  }
}
