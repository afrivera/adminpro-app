import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[]
  public imgUrl: string = '';
  public user: User

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) { 
    this.menuItems = this.sidebarService.menu;
    this.imgUrl = userService.user.imageUrl;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
