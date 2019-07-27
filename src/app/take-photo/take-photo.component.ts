import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service'

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.css']
})
export class TakePhotoComponent implements OnInit {
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  // public captures: Array<any>;
  public foto: any
  id: any
  ready = false
  constructor(private route: ActivatedRoute, private router:Router, private imageService : ImageService) {
    // this.captures = []
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 540, 380);
    var imgb64 = this.canvas.nativeElement.toDataURL("image/png")
    // this.captures.push(imgb64);
    this.foto = imgb64
  }

  guardar() {    

    let data = {
      card_id: `${this.id}`,
      // image: `../../assets/${ruta}.png`
      image64: this.foto,
      image: `${Date.now()}-${this.id}`
    }
    console.log(data)
    // var FileSaver = require('file-saver');    
    this.imageService.create(data).subscribe(response=>{
      console.log(response)
      // FileSaver.saveAs(this.foto, ruta);      
      this.router.navigateByUrl(`/images/${this.id}`)
    }) 
  }

  getReady(){
    this.ready=true
  }
}