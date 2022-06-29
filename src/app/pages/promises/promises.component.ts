import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promise = new Promise( (resolve, reject) => {
    //   if( false ){
    //     resolve('Hola Mundo');        
    //   }else{
    //     reject('algo salio mal');
    //   }
    // })

    // promise.then( console.log ).catch(console.log)


    // console.log('end init')

    this.getUsers()
      // .then( console.log)

  }

  getUsers(){

    const promise = new Promise( (resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(user => user.json())
        .then( us => resolve(us.data))
      
    })

    return promise;

  }
}
