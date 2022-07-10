import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser( formData: RegisterForm ){
    return this.http.post( `${this._baseUrl}/users`, formData )
               
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
}
