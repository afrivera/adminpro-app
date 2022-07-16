import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal: boolean = true;

  get hiddenModal(){
    return this._hiddenModal
  }
  constructor() { }

  openModal(){
    this._hiddenModal = false;
  }

  closeModal(){
    this._hiddenModal = true;
  }
}
