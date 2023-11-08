import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictOfficerComponent } from './district-officer.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DistrictOfficerComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistrictOfficerComponent]
})
export class DistrictOfficerModule { }
