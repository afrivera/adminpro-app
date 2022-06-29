import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string = '';
  public titleSub$: Subscription

  constructor( private router: Router) {
    this.titleSub$ = this.getArgsRoute()      
    .subscribe( ({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    })
  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getArgsRoute(){
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd  ),
        map( event => event as ActivationEnd ),
        filter( (e:ActivationEnd)  => e.snapshot.firstChild === null ),
        map( e => e.snapshot.data )
      )
  }

}
