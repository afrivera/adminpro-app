import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmit = false;

  public registerForm = this.fb.group({
    name: ['andres', [ Validators.required, Validators.minLength(3) ]],
    email: ['test20@gmail.com', [ Validators.required, Validators.email ]],
    password: ['1234567', [ Validators.required, Validators.minLength(7) ]],
    password2: ['1234567', [ Validators.required, Validators.minLength(7) ]],
    terms: [false, [ Validators.requiredTrue ]],
  }, {
    validators: this.samePasswords('password', 'password2')
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  createUser(){
    this.formSubmit = true;
    // console.log(this.registerForm.value)

    if( this.registerForm.invalid ){
      return;
    } 
    
    // do post
    this.userService.createUser(this.registerForm.value)
      .subscribe({
        next:  resp => {
          this.router.navigateByUrl('/dashboard')
        },
        error: err => {
          // console.log(err.status)
          Swal.fire('Error', 'there was an error', 'error')
        }
      });
  }

  invalidField( field: string ): boolean {
    if( this.registerForm.get(field)?.invalid && this.formSubmit ){
      return true
    } else {
      return false;
    }
  }

  passwordInvalid(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if( (pass1 !== pass2) && this.formSubmit) {
      return true
    } else{
      return false;
    }
  }

  acceptTerms(){
    return !this.registerForm.get('terms')?.value && this.formSubmit;
  }

  samePasswords(pass1: string, pass2: string){

    return (fg: FormGroup)=> {
      const pass1Control = fg.get(pass1)
      const pass2Control = fg.get(pass2)

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({notSame: true})
      }
    }
  }
}
