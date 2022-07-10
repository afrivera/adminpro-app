import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';
  public name: string = '';
  public email: string = '';

  constructor( private userService: UserService) { 
    this.imgUrl = userService.user.imageUrl;
    this.name = userService.user.name;
    this.email = userService.user.email;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
  }

}
