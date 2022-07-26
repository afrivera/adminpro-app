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

  loadHospitals():Observable<Hospital[]>{
    const url = `${ base_url}/hospitals`
    return this.http.get( url )
            .pipe(
              map( (res: any) => res .body)
            )        
  }

  createHospital( name: string ){
    const url = `${ base_url}/hospitals`
    return this.http.post( url, { name });
  }

  updateHospital( _id: string, name: string ){
    const url = `${ base_url}/hospitals/${ _id }`
    return this.http.put( url, { name });
  }

  destroyHospital( _id: string ){
    const url = `${ base_url}/hospitals/${ _id }`
    return this.http.delete( url);
  }

}

