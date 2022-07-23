import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchsService } from '../../../services/searchs.service';

import { Doctor } from '../../../models/doctor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  private imgSubs!: Subscription;
  public doctorsTemp: Doctor[] = [];

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDoctors()

    this.imgSubs = this.modalImageService.newImage
      .subscribe(img => this.loadDoctors());
  }

  loadDoctors(){
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe( doctors => {
        this.loading = false;
        this.doctors = doctors;
        this.doctorsTemp = doctors;
      })
  }

  openModal(doctor: Doctor){
    this.modalImageService.openModal('doctors', doctor._id!, doctor.image)
  }

  search( term: string ):any{
    if( term.length === 0){
      return this.doctors = [...this.doctorsTemp];
    }
    this.searchService.search('doctors', term)
      .subscribe( resp => this.doctors = resp )
  }

  deleteDoctor(doctor: Doctor){
    Swal.fire({
      title: '¿Are you Sure',
      text: `you delete to ${ doctor.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it'
    }).then( (result) => {
      if( result.value ){
        this.doctorService.destroyDoctor( doctor )
          .subscribe( resp => {
            Swal.fire(
              'Deleted!',
              `${ doctor.name } has been deleted`,
              'success'
            )
            this.loadDoctors();
          })
      }
    })

  }

}
