import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map, Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';


const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

  get token( ){
    return localStorage.getItem('x-token') || '';
  }
  
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadDoctors(): Observable<Doctor[]>{
    const url = `${ base_url }/doctors`;
    return this.http.get( url, this.headers )
      .pipe(
        map((res: any) => res.body)
      )
  }

  destroyDoctor( doctor: Doctor ){
    const url = `${ base_url}/doctors/${ doctor._id}`;
    return this.http.delete(url, this.headers);
  }
}
