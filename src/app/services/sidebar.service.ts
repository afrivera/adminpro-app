import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit{

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/'},
  //       { title: 'ProgressBar', url: 'progress'},
  //       { title: 'Graph', url: 'graph1'},
  //       { title: 'Promises', url: 'promises'},
  //       { title: 'Rxjs', url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     title: 'maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users'},
  //       { title: 'Hospitals', url: 'hospitals'},
  //       { title: 'Doctors', url: 'doctors'},
  //     ]
  //   },
  // ]

  public menu: any[]= []

  constructor() { }
  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu')!) || [];
  }
}
