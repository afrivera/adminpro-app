import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchsService {
  
  private _baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  get token():string {
    return localStorage.getItem('x-token') || '';
  }

  transformUsers( results: any[]) :User[]{
    
    return results.map( 
      user => new User( user.name, user.email, '', user.image, user.google, user.role, user.uid )
    )
  }

  globalSearch( term: string ){
    const url = `${ this._baseUrl }/all/search/${ term }`
    return this.http.get( url );
  }

  search( type: 'users' | 'doctors' | 'hospitals', term: string){
    return this.http.get<any []>( `${this._baseUrl}/all/collection/${ type }/${ term }`)
            .pipe(
              map( (resp: any ) =>{
                switch (type) {
                  case 'users':
                    return this.transformUsers( resp.body )
                
                  case 'doctors':
                  case 'hospitals':
                    return resp.body;
                
                  default:
                    return [];
                }
              })
            )
  }

}
