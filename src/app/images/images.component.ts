import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private imageService : ImageService, private fb : FormBuilder) {
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
  archivo = null  
  video = null
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
        
    // var data = {
    //   card_id : this.id,
    //   image : '../assets/'+this.archivo.name
    // }  

    // console.log(data)

    // this.imageService.create(data).subscribe(response=>{
    //   console.log(response)
    //   location.replace('/images/'+this.id)
    // })
    console.log(this.video)
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          // value: reader.result.split(',')[1]
          value: reader.result
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;    
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel);
      alert('done!');      
    }, 1000);
  }
}













