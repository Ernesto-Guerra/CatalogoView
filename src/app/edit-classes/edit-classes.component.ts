import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-classes',
  templateUrl: './edit-classes.component.html',
  styleUrls: ['./edit-classes.component.css']
})
export class EditClassesComponent implements OnInit {

  constructor(private classService: ClassService, private route: ActivatedRoute, private router: Router) { }

  id = null
  classs = {}
  ready = false
  modify = true

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] == "add") {
        this.modify = false
      }
      else {
        this.id = +params['id']

        this.classService.show(this.id).subscribe(response => {
          this.classs = response
          this.ready = true
        })
      }

    })
  }

  save() {
    if (confirm('¿Deseas guardar los cambios?')) {
      if(this.modify){
        console.log('si modifica')
        this.classService.update(this.id, this.classs).subscribe(response => {
          console.log(response)
          alert('Se actualizó la clase')
          this.router.navigateByUrl('/classes')
        })
      }
      else{
        this.classService.create(this.classs).subscribe(response=>{
          console.log(response)
          alert('Se creó la clase')
          this.router.navigateByUrl('/classes')
        })
      }
      
    }
  }
}
