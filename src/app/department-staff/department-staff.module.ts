import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentStaffComponent } from './department-staff.component';
import { Routes, RouterModule } from '@angular/router';
import { ManageListsComponent } from './manage-lists/manage-lists.component';
import { LicensingRequiredComponent } from './licensing-required/licensing-required.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { AccountComponent } from './account/account.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: DepartmentStaffComponent,
  },
  {
    path: 'manage-lists',
    component: ManageListsComponent,
  },
  {
    path: 'licensing-required',
    component: LicensingRequiredComponent,
  },
  {
    path: 'statistical',
    component: StatisticalComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [
    DepartmentStaffComponent,
    ManageListsComponent,
    LicensingRequiredComponent,
    StatisticalComponent,
  ],
})
export class DepartmentStaffModule {}
