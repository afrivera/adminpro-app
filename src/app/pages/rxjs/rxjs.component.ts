import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    this.intervalSubs = this.returnInterval()
      .subscribe(
        value => console.log(value)
      )

    // this.returnObs().pipe(
    //   retry(1)
    // ).subscribe(
    //   value => console.log( value ),
    //   (err)=> console.warn( err ),
    //   ()=> console.log('end obs')
    // )

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()  
  }

  ngOnInit(): void {
    
  }

  returnInterval(): Observable<number>{
    return interval(100)
            .pipe(
              map( value => value +1 ),
              filter( val => (val % 2 === 0)? true: false),
              // take(10),
            )
  }

  returnObs(){
    
    let i = 1;
    const obs$ = new Observable<number>( observer => {
      const interval = setInterval(()=> {
        i++
        observer.next(i);
        if( i === 4){
          clearInterval( interval )
          observer.complete();
        }

        if( i ==2) {
          observer.error('i get 2')
        }
      },1000)
    });
    return obs$;
  }

}
