import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoadUsers } from '../interfaces/load-users.interface';

import { User } from '../models/user.model';
import Swal from 'sweetalert2';

declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = environment.baseUrl;
  public auth2: any;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.googleInit();
  }

  get token(){
    return localStorage.getItem('x-token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.user.role!
  }

  get uid(){
    return this.user.uid || '';
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

  saveLS( token: string, menu:any ){
    localStorage.setItem('x-token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  ValidToken(): Observable<boolean>{
    return this.http.get(`${this._baseUrl}/auth/renew`)
      .pipe(
        map( (resp: any) => {
          const { name, email, image, google, role, uid } = resp.body.user;
          this.user = new User( name, email, '', image, google, role, uid);
          this.saveLS( resp.body.token, resp.body.menu);
          return true;
        }),
        catchError( err => of( false ))
      )
  }

  createUser( formData: RegisterForm ){
    return this.http.post( `${this._baseUrl}/users`, formData )
              .pipe(
                tap(
                  (resp: any) => {
                    this.saveLS( resp.body.token, resp.body.menu);
                  }
                ),
                map( res => true),
                catchError( err => of( false ))
              )
               
  }

  updateProfile( data: { email: string, name: string }){
    return this.http.put( `${ this._baseUrl }/users/${this.uid}`, data )      
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
                  this.saveLS( resp.body.token, resp.body.menu);
                  return true
                }),
                catchError( err => of( false ))
              )     
  }

  loginGoogle( token: string ){
    
    return this.http.post( `${this._baseUrl}/auth/login/google`, {token} )
              .pipe(
                tap( (resp: any) => {
                  this.saveLS( resp.body.token, resp.body.menu);
                  return true
                })
              )     
  }

  logout(){
    localStorage.removeItem('x-token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then(()=> {
      this.ngZone.run(()=> {
        this.router.navigateByUrl('/login')   
      })
    })
  }

  getUsers(since:number = 0){
    return this.http.get<LoadUsers>( `${this._baseUrl}/users?since=${ since }`)
            .pipe(
              delay( 600 ),
              map( resp => {

                const users = resp.body.users.map( user => new User( user.name, user.email, '', user.image, user.google, user.role, user.uid));
                return {
                  body: {
                    total: resp.body.total,
                    users
                  }
                }
              } )
            )
  }

  destroyUser( user: User ){
    return this.http.delete( `${ this._baseUrl }/users/${ user.uid }` );
  }

  saveProfile( user: User ){
    return this.http.put( `${ this._baseUrl }/users/${user.uid}`, user )      
  }
}
