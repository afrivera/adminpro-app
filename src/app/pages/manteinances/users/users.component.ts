import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { SearchsService } from '../../../services/searchs.service';
import { ModalImageService, Types } from '../../../services/modal-image.service';

import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers = 0;
  public users : User[] = [];
  public usersTemp : User[] = [];

  public imgSubs!: Subscription
  public since: number = 0;
  public loading: boolean = true

  constructor(
    private userService: UserService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

    this.imgSubs =  this.modalImageService.newImage.subscribe( img => this.loadUsers());
  }

  loadUsers(){
    this.loading = true;
    this.userService.getUsers( this.since )
      .subscribe(({body}) => {
        this.totalUsers = body.total;
        this.users = body.users; 
        this.usersTemp = body.users; 
        this.loading = false
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

  search( term: string ): any{
    if( term.length ===0){
      return this.users = [...this.usersTemp];
    }
    this.searchService.search( 'users', term )
      .subscribe ( resp => this.users = resp)
  }

  delUser( user: User):any{

    if( user.uid === this.userService.uid){
      return Swal.fire('Error', 'You Can\'t delete yourself', 'error')
    }

    Swal.fire({
      title: '¿Are you Sure',
      text: `you delete to ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it'
    }).then( (result) => {
      if( result.value ){
        this.userService.destroyUser( user )
          .subscribe( resp => {
            Swal.fire(
              'Deleted!',
              `${ User.name } has been deleted`,
              'success'
            )
            this.loadUsers();
          })
      }
    })
  }

  changeRole( user: User ){
    this.userService.saveProfile( user )
      .subscribe(res => {
        Swal.fire('success', 'rol update successfully', 'success');
      } )
  }

  showModalImage( user: User ){
    this.modalImageService.openModal( Types.users, user.uid! , user.image );
  }

}
