import { Component, OnInit } from '@angular/core';
import { MajorclassesService } from '../services/majorclasses.service'
import { MajorService } from '../services/major.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../services/class.service'

@Component({
  selector: 'app-major-classes',
  templateUrl: './major-classes.component.html',
  styleUrls: ['./major-classes.component.css']
})
export class MajorClassesComponent implements OnInit {

  constructor(private majorClassesService : MajorclassesService,private router: Router, private route : ActivatedRoute, private classService : ClassService, private majorService : MajorService) { }

  id : any  
  name : any
  actual_classes : any
  actual_to_show_classes = []
  all_classes : any
  to_show_classes = []  
  ready = false

  ngOnInit() {
    this.inicio()
  }

  inicio(){    
    this.actual_to_show_classes = []
    this.to_show_classes = []  
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.majorService.show(this.id).subscribe(response =>{
      this.name = response
      this.ready=true
    })
    this.classService.getAll().subscribe(response=>{
      // console.log(response)
      this.all_classes = response

      this.majorClassesService.get(this.id).subscribe(response=>{
        this.actual_classes = response
        // console.log(response)
        console.log(this.actual_classes)
        this.getAvailableClasses()
      })

    })   
  }

  getAvailableClasses(){    

    if(this.actual_classes.length > 0){
      this.actual_classes.forEach(actual => {
        this.all_classes.forEach(clase => {
          if(actual.class_id == clase.id){
            this.actual_to_show_classes.push(clase)
          }          
        });
      });   
      
      this.to_show_classes = this.all_classes.filter(el=> !this.actual_to_show_classes.includes(el))
    }
    else{
      this.to_show_classes = this.all_classes
    }

    var i = 0
    this.actual_to_show_classes.forEach(actual => {
      actual.key = this.actual_classes[i].id
      i++
    });
    

    // console.log(this.actual_to_show_classes)
    // console.log(this.to_show_classes)
  }

  addClass(class_id){
    let data = {
      major_id : this.id,
      class_id : class_id
    }

    this.majorClassesService.create(data).subscribe(response=>{
      // console.log(response)      
      this.inicio()
      // this.router.navigateByUrl('/majorclasses/'+this.id)
      
    })
  }

  removeClass(key){
    this.majorClassesService.delete(key).subscribe(response => {
      console.log(response)      
      this.inicio()
      // this.router.navigateByUrl('/majorclasses/'+this.id)
    })
  }

}
