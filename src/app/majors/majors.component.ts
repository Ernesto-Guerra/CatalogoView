import { Component, OnInit } from '@angular/core';
import { MajorService } from '../services/major.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Major } from '../models/major';

@Component({
  selector: 'app-majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css']
})
export class MajorsComponent implements OnInit {

  constructor(
    private majorService: MajorService,
    private route: ActivatedRoute
  ) { }

  major = {}
  majors: Major[] = []

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.majorService.getAll().pipe(first()).subscribe(majors => {
        console.log(majors)
        this.majors = majors
      });
    })
  }

  filter(){
    console.log(this.major)
    //obtener con get los alumnos de las carreras
    //entonces redirigir a home con esos alumnos para mostrar
  }

}
