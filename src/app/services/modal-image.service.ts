import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

export enum Types {
  users = 'users',
  doctors = 'doctors',
  hospitals = 'hospitals',
}
@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal: boolean = true;
  private _baseUrl : string = environment.baseUrl;

  public type!: 'users' | 'hospitals' | 'doctors';
  public id!: string;
  public img!: string;

  public newImage: EventEmitter<string> = new EventEmitter<string >()

  get hiddenModal(){
    return this._hiddenModal
  }
  constructor() { }

  openModal( 
    type: 'users' | 'hospitals' | 'doctors', 
    id: string,
    img: string = 'no-image'){
      this._hiddenModal = false;
      this.type = type;
      this.id = id;
      // this.img = img;
      // http://localhost:3000/api/uploads/:collection/:file
      if( img.includes('https') ){
        this.img = img;
      } else {
        this.img = `${ this._baseUrl }/uploads/${ type }/${ img }`
      }
  }

  closeModal(){
    this._hiddenModal = true;
  }
}
