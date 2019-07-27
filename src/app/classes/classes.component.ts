import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})


export class ClassesComponent implements OnInit {

  constructor(private classService : ClassService, private router:Router) { }
  
  classes = {}
  classs = {}
  grades = [1,2,3,4,5,6,7,8,9,10]
  ready = false

  ngOnInit() {
    this.inicio()
  }

  inicio(){
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
      
      this.inicio()
    })    
  }

  delete(id){
    if(confirm('¿Deseas eliminar esta materia?')){
      this.classService.delete(id).subscribe(response => {
        console.log(response)
        alert('Elemento eliminado con éxito')
        this.inicio()
      })
    }    
    else{
      alert('No se ha eliminado la materia')
    }
  }
}
