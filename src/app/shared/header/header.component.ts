import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';
  public user: User;

  constructor( private userService: UserService,
               private router: Router) { 
    this.imgUrl = userService.user.imageUrl;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
  }

  search( term: string ){
    if(term.length === 0){
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${ term }`)
  }

}
