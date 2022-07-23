import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchsService } from '../../../services/searchs.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals : Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;
  public hospitalsTemp: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService
  ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();    

    this.imgSubs = this.modalImageService.newImage
      .subscribe( img => this.loadHospitals())
  }

  loadHospitals(){
    this.loading = true;

    this.hospitalService.loadHospitals()
      .subscribe( hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
        this.hospitalsTemp = hospitals;
      })
  }

  saveChanges( hospital: Hospital ){
    this.hospitalService.updateHospital( hospital._id!, hospital.name )
      .subscribe( resp => {
        Swal.fire('updated', hospital.name, 'success')
      })
  }

  destroyHospital( hospital: Hospital ){
    this.hospitalService.destroyHospital( hospital._id! )
      .subscribe( resp => {
        this.loadHospitals();
        Swal.fire('deleted', hospital.name, 'success')
      })
  }

  async openSweetAlert(){
    const { value } = await Swal.fire<string>({
      title: 'Add Hospital',
      text: 'enter the new hospital name',
      input: 'text',
      inputPlaceholder: 'hospital name',
      showCancelButton: true,
    })

    if( !value ){ return ;}

    if( value?.trim().length > 0 ){
      this.hospitalService.createHospital( value )
        .subscribe( resp => {
          this.loadHospitals();
        })
    }
  }

  openModal( hospital: Hospital ){
    this.modalImageService.openModal( 'hospitals', hospital._id!, hospital.image);
  }

  search( term: string ):any{
    if( term.length === 0) {
      return this.hospitals = [...this.hospitalsTemp ];
    }
    this.searchService.search('hospitals', term)
      .subscribe( resp => this.hospitals = resp);
  }

}
