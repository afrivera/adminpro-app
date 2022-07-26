import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public email!: string;
  public formSubmit = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: ['test20@gmail.com', [ Validators.required, Validators.email ]],
    password: ['1234567', [ Validators.required, Validators.minLength(7) ]],
    remember: [ false ]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1){
      this.loginForm.get('remember')?.setValue(true);
    }
    this.renderButton();
  }

  login(){

    this.userService.login( this.loginForm.value )
      .subscribe( resp => {
        if( resp){
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', 'Invalid Credentials', 'error')
        }
      })
    // console.log(this.loginForm.value)
    // this.router.navigateByUrl('/');
  }

  // onSuccess(googleUser: any) {
  //   // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   const id_token = googleUser.getAuthResponse().id_token
  //   console.log(id_token)
  // }

  // onFailure(error: any) {
  //   console.log(error);
  // }

  async startApp(){
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) =>{
          const id_token = googleUser.getAuthResponse().id_token
          // console.log(id_token) 
          this.userService.loginGoogle( id_token )
            .subscribe(resp => {
              this.ngZone.run(()=> {
                this.router.navigateByUrl('/dashboard')
              })

            })
        }, (error: any)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }
}
