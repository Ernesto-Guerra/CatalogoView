import { Component, OnInit } from '@angular/core';
import { StudentclassesService } from '../services/studentclasses.service'
import { ClassService } from '../services/class.service'
import { MajorclassesService } from '../services/majorclasses.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit {


  mycard : any
  major_classes : any
  mymajor : any
  all_classes : any
  actual_classes : any
  actual_to_show_classes = []
  to_show_classes = []
  ready = false
  constructor(private studentClassesService : StudentclassesService,
              private classService : ClassService,
              private majorclassesService : MajorclassesService      
              ) { }

  ngOnInit() {    
    this.inicio()
  }

  inicio(){
    this.actual_to_show_classes=[]
    this.to_show_classes=[]
    this.mycard = JSON.parse(localStorage.getItem('user'))
    this.mymajor = {
      major_id : this.mycard.card.slice(7,this.mycard.card.length)
    }

    // this.mycard = this.mycard.card.slice(0,6)
    this.mycard = this.mycard.card
    console.log(this.mymajor)
    console.log(this.mycard)

    this.majorclassesService.get(this.mymajor.major_id).subscribe(response=>{
      this.major_classes = response
      console.log(response)
    })
    this.classService.getAll().subscribe(response=>{
      this.all_classes = response
      console.log(response)

      this.studentClassesService.getByCard(this.mycard).subscribe(response=>{
        this.actual_classes = response
        // console.log(response)
  
        this.getAvailableClasses()
        this.ready=true
      })
    })

  }

  getAvailableClasses(){    

    if(this.actual_classes.length > 0){

      // this.all_classes.forEach(element => {
      //   this.major_classes.forEach(major => {
      //     if(element.id == major.class_id){
      //       this.to_show_classes.push(element)
      //     }
      //   });
      // });

      this.all_classes.forEach(element => {
        this.major_classes.forEach(major => {
          if(element.id == major.class_id){
            this.to_show_classes.push(element)
          }
        });
      });

      this.actual_classes.forEach(actual => {
        this.to_show_classes.forEach(clase => {
          if(actual.class_id == clase.id){
            this.actual_to_show_classes.push(clase)
          }          
        });
      });   
      
      this.to_show_classes = this.to_show_classes.filter(el=> !this.actual_to_show_classes.includes(el))
    }
    else{
      console.log('aqui')
      // this.to_show_classes = this.all_classes
      this.all_classes.forEach(element => {
        this.major_classes.forEach(major => {
          if(element.id == major.class_id){
            this.to_show_classes.push(element)
          }
        });
      });

      console.log(this.to_show_classes)
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
      card_id : this.mycard,
      class_id : class_id,
      status : 'activo'
    }

    this.studentClassesService.create(data).subscribe(response=>{
      // console.log(response)
      this.inicio()
    })
  }

  removeClass(key){
    this.studentClassesService.delete(key).subscribe(response => {
      console.log(response)
      this.inicio()
    })
  }

}
