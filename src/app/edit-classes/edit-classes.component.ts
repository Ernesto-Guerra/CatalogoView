import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-classes',
  templateUrl: './edit-classes.component.html',
  styleUrls: ['./edit-classes.component.css']
})
export class EditClassesComponent implements OnInit {

  constructor(private classService : ClassService, private route : ActivatedRoute) { }

  id = null
  classs = {}
  ready = false

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id']

      this.classService.show(this.id).subscribe(response =>{
        this.classs = response
        this.ready = true
      })
    })
  }

  save(){
    if(confirm('¿Deseas guardar los cambios?')){
      this.classService.update(this.id,this.classs).subscribe(response=>{
        console.log(response)
        alert('Se actualizó la clase')
        location.replace('/classes')
      })
    }    
  }
}
