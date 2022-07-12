import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public imagUpload!: File;
  public imageTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploaService: FileUploadService
  ) { 
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    })
  }

  updateProfile(){
    // console.log(this.profileForm.value)
    this.userService.updateProfile( this.profileForm.value )
      .subscribe(resp=>{
        console.log(resp)
        const { name, email} = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
      })
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
    this.fileUploaService.updatePhoto(this.imagUpload, 'users', this.user.uid!)
      .then(image => this.user.image = image)
  }

}
