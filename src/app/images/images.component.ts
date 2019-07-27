import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  form: FormGroup;  
  prueba = 0    
  
  // imgb = require('base64-img')  

  constructor(private route: ActivatedRoute, private router:Router, private imageService : ImageService, private fb : FormBuilder) {
    this.createForm()           
   }
  
   createForm() {
    this.form = this.fb.group({
      file: null   
    });
  }
  id = null
  ready = false
  images = {}    

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })
    
      await this.imageService.get(this.id).subscribe(response=>{
        this.images = response
        console.log(this.images)
       
        this.prueba++
        if(this.images[0].listo && this.images[0].card_id==this.id){
          console.log(this.images[0].listo)
          this.ready = true
          console.log('Listo')
        }
        else{        
          location.reload()
          console.log('Repitiendo')          
        }      
      })
        
  }
  

  delete(id){
    if(confirm('¿Deseas eliminar esta imagen?')){
      this.imageService.delete(id).subscribe(response=>{
        if(response.hasOwnProperty('msg')){
          alert('La imagen fue eliminada')
          console.log(this.images)                    
          this.router.navigateByUrl('/images/'+this.id)
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
        
    // var data = {
    //   card_id : this.id,
    //   image : '../assets/'+this.archivo.name
    // }  

    // console.log(data)

    // this.imageService.create(data).subscribe(response=>{
    //   console.log(response)    
    // })    
  }


  onFileChange(event) {
    let reader = new FileReader();    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file)
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          // value: reader.result.split(',')[1]
          image: reader.result,
          card_id: this.id
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;    
    console.log(formModel.file)       
    var extension = formModel.file.filename.substring(formModel.file.filename.length, formModel.file.filename.length -3)    
    var ruta = `${Date.now()}-${this.id}`     
    let data ={
      card_id : formModel.file.card_id,
      image : `../../assets/${ruta}.${extension}`,
      image64: formModel.file.image
    }
    console.log(data)    
    this.imageService.create(data).subscribe(response=>{
      console.log(response)      
      location.reload()
    })    
  }
}













