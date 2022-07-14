import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public totalUsers = 0;
  public users : User[] = [];
  public since: number = 0

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers( this.since )
      .subscribe(({body}) => {
        this.totalUsers = body.total;
        this.users = body.users; 
      })
  }

  changePage( value: number ){
    this.since += value;
    if( this.since < 0){
      this.since = 0
    } else if( this.since > this.totalUsers ){
      this.since -= value;
    }

    this.loadUsers();
  }

}
