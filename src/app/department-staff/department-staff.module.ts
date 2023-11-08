import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentStaffComponent } from './department-staff.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DepartmentStaffComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepartmentStaffComponent]
})
export class DepartmentStaffModule { }
