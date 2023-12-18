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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgZorroAntModule } from '../ng-zorro-ant.module';

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
    NgZorroAntModule,
    EditorModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DepartmentStaffComponent,
    ManageListsComponent,
    LicensingRequiredComponent,
    StatisticalComponent,
    AccountComponent
  ],
})
export class DepartmentStaffModule {}
