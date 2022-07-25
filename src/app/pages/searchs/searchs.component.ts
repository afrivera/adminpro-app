import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';

import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styles: [
  ]
})
export class SearchsComponent implements OnInit {

  public users: User[] = []
  public doctors: Doctor[] = []
  public hospitals: Hospital[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private searhService: SearchsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ term }) => this.globalSearch( term ))
  }

  globalSearch( term: string ){
    this.searhService.globalSearch( term )
      .subscribe( (res: any) => {
        this.users     = res.body.users;
        this.doctors   = res.body.doctors;
        this.hospitals = res.body.hospitals;
      })
  }

}
