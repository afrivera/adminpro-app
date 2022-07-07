import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmit = false;

  public loginForm = this.fb.group({
    email: ['test20@gmail.com', [ Validators.required, Validators.email ]],
    password: ['1234567', [ Validators.required, Validators.minLength(7) ]],
    remember: [ false ]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.login( this.loginForm.value )
      .subscribe( resp => this.router.navigateByUrl('/dashboard'))
    // console.log(this.loginForm.value)
    // this.router.navigateByUrl('/');
  }

}
