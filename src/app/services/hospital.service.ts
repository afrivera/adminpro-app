import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map, Observable } from 'rxjs';
import { Hospital } from '../models/hospital.model';

interface _ResponseHospital {
  code: number;
  status: boolean;
  message: string;
  body: Hospital[]
}

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    // private 
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


  loadHospitals():Observable<Hospital[]>{
    const url = `${ base_url}/hospitals`
    return this.http.get( url, this.headers )
            .pipe(
              map( (res: any) => res .body)
            )
        
  }

}

