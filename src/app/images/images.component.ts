import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private imageService : ImageService) { }
  
  id = null
  ready = false
  images = {}
  archivo = null
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.imageService.get(this.id).subscribe(response=>{
      this.images = response
      console.log(this.images)
      this.ready = true
    })
  }

  delete(id){
    if(confirm('¿Deseas eliminar esta imagen?')){
      this.imageService.delete(id).subscribe(response=>{
        if(response.hasOwnProperty('msg')){
          alert('La imagen fue eliminada')
          console.log(this.images)          
          location.replace('/images/'+this.id)
        }
        else{
          alert('La imagen no fue eliminada')
          console.log(response)
        }
      })
    }
    else{
      alert('La imagen no fue eliminadaa')
    }
  }

  save(){
        
    var data = {
      card_id : this.id,
      image : '../assets/'+this.archivo.name
    }  

    console.log(data)

    this.imageService.create(data).subscribe(response=>{
      console.log(response)
      location.replace('/images/'+this.id)
    })
  }

  onFileSelected(event){
    this.archivo = event.target.files[0]
  }
}













