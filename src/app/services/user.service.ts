import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = environment.baseUrl;
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.googleInit();
  }

  googleInit(){
    return new Promise( resolve => {
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '174958170554-qqdg6j83ss7l72146n7v84527af9icvs.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(true);
      });
    })
  }

  ValidToken(): Observable<boolean>{
    const token = localStorage.getItem('x-token') || '';
    return this.http.get(`${this._baseUrl}/auth/renew`, {
      headers: {
        'x-token': token
      }
    })
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('x-token', resp.body.token)
        }),
        map( res => true),
        catchError( err => of( false ))
      )
  }

  createUser( formData: RegisterForm ){
    return this.http.post( `${this._baseUrl}/users`, formData )
              .pipe(
                tap(
                  (resp: any) => {
                    localStorage.setItem('x-token', resp.body.token)
                  }
                ),
                map( res => true),
                catchError( err => of( false ))
              )
               
  }

  login( formData: LoginForm ){
    if( formData.remember){
      localStorage.setItem('email', formData.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post( `${this._baseUrl}/auth/login`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('x-token', resp.body.token)
                  return true
                })
              )     
  }

  loginGoogle( token: string ){
    
    return this.http.post( `${this._baseUrl}/auth/login/google`, {token} )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('x-token', resp.body.token)
                  return true
                })
              )     
  }

  logout(){
    localStorage.removeItem('x-token');
    this.auth2.signOut().then(()=> {
      this.ngZone.run(()=> {
        this.router.navigateByUrl('/login')   
      })
    })
  }
}
