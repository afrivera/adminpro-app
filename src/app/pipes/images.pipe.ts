import { Pipe, PipeTransform } from '@angular/core';
import { Types } from '../services/modal-image.service';
import { environment } from '../../environments/environment.prod';


const base_url = environment.baseUrl;

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(image: string, type: 'users' | 'hospitals'| 'doctors'): string {
    if( !image ){
      return `${ base_url }/uploads/${ type }/no-image`;
  }else if( image?.includes('https')){
      return image;
  }else if( image){
      return `${ base_url }/uploads/${ type }/${ image }`;
  }else {
      return `${ base_url }/uploads/${ type }/no-image`;
  }
  }

}
