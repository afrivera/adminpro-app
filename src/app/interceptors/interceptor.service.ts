import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';


const API_URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'x-token': this.token
    })

    const reqClone = req.clone({
      headers
    });

    return next.handle( reqClone )
              .pipe(
                catchError( (err: any) => this._catchError(  err )),
                map( (response: any) => response )
              )
  }

  private _catchError( error:any){
    return throwError( () => new Error( error ) )
  }

  get token(){
    return localStorage.getItem('x-token') || '';
  }
}
