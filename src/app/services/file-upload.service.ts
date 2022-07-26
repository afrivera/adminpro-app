import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePhoto(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ){
    try {
      const url = `${base_url}/uploads/${ type }/${ id }`;

      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch( url, {
        method: 'PUT',
        body: formData
      });

      const data = await resp.json();
      if( data.status ){
        return data.body.image
      } else {
        console.log(data.message)
        return false;
      }

    } catch (error) {
      console.log(error)
      return false
    }
  }
}
