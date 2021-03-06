import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';
  public user: User;

  constructor( private userService: UserService) { 
    this.imgUrl = userService.user.imageUrl;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
  }

}
