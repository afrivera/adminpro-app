import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';

import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  private imgSubs!: Subscription;
  public doctorsTemp: Doctor[] = [];

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
    this.loadDoctors()
  }

  loadDoctors(){
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe( doctors => {
        console.log(doctors)
        this.loading = false;
        this.doctors = doctors;
        this.doctorsTemp = doctors;
      })
  }

  openModal(doctor: Doctor){
    this.modalImageService.openModal('doctors', doctor._id!, doctor.image)
  }

}
