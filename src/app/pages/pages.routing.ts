import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './manteinances/users/users.component';
import { HospitalsComponent } from './manteinances/hospitals/hospitals.component';
import { DoctorsComponent } from './manteinances/doctors/doctors.component';


const routes: Routes = [
    { path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar'} },
      { path: 'graph1', component: Graph1Component, data: { title: 'Graph #1'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings'} },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS'} },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile'} },

      // manteinances
      { path: 'users', component: UsersComponent, data: { title: 'Application Users'} },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Application Hospitals'} },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Application Doctors'} },

    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
