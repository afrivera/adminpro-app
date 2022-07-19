import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imagUpload!: File;
  public imageTemp: any = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imageTemp = null;
    this.modalImageService.closeModal();
  }

  
  changeImage( file: File ): null | void{
    this.imagUpload = file; 
    if( !file ){
      return this.imageTemp = null;
    }   

    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = ()=> {
      this.imageTemp = reader.result
    }
  }

  uploadImage(){

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatePhoto(this.imagUpload, type, id )
      .then(image => {
        Swal.fire('update image', 'update image successfully', 'success');
        this.modalImageService.newImage.emit(image)
        this.closeModal();
      })
      .catch(err => {
        Swal.fire('error', 'there was an error trying to modify the image', 'error')
      })
  }

}
