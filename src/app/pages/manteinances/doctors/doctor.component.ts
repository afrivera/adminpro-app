import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

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

  constructor(
   private fb: FormBuilder,
   private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.loadHospitals()
    this.doctorForm = this.fb.group({
      name: ['Cristian', Validators.required],
      hospital: ['', Validators.required],
    })

    this.doctorForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelect = this.hospitals.find( h => h._id === hospitalId)!
      })
  }

  loadHospitals(){
    this.hospitalService.loadHospitals()
      .subscribe( res => this.hospitals = res)
  }

  saveDoctor(){
    console.log(this.doctorForm.value)
  }

}
