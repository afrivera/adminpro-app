import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';

import { Doctor } from '../../../models/doctor.model';
import { Hospital } from '../../../models/hospital.model';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];

  public hospitalSelect!: Hospital;
  public doctorSelect!: Doctor;

  constructor(
   private fb: FormBuilder,
   private hospitalService: HospitalService,
   private doctorService: DoctorService,
   private router: Router,
   private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => this.loadDoctor( id ));

    this.loadHospitals()
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.doctorForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelect = this.hospitals.find( h => h._id === hospitalId)!
      })
  }

  loadDoctor( id: string ){
    if( id === 'new'){ return;}

    this.doctorService.getDoctorById(id)
      .pipe(
        delay(100)
      )
      .subscribe({
          next: doctor => {
            const name = doctor.name
            const _id = doctor.hospital?._id || '';
            this.doctorSelect = doctor;
            this.doctorForm.setValue({ name, hospital: _id});
          },
          error: err => {
            this.router.navigateByUrl(`/dashboard/doctors`)
          }
        })
  }

  loadHospitals(){
    this.hospitalService.loadHospitals()
      .subscribe( hospitals => this.hospitals = hospitals)
  }

  saveDoctor(){
    const { name } = this.doctorForm.value;

    if( this.doctorSelect ){
      // update
      const data = { 
        ...this.doctorForm.value,
        _id: this.doctorSelect._id
      }
      this.doctorService.updateDoctor( data )
        .subscribe( (resp:any) => {
          Swal.fire('Updated', `${ name } updated succesfully`, 'success');
          // this.router.navigateByUrl(`/dashboard/doctor/${ resp.body._id}`)
        })
    } else {
      // create
      this.doctorService.createDoctor( this.doctorForm.value )
        .subscribe( (resp:any) => {
          Swal.fire('Created', `${ name } created succesfully`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${ resp.body._id}`)
        })

    }
  }

}
