import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'people',
    loadChildren: () =>
      import('./people/people.module').then((m) => m.PeopleModule),
  },
  {
    path: 'ward-officials',
    loadChildren: () =>
      import('./ward-officials/ward-officials.module').then((m) => m.WardOfficialsModule),
  },
  {
    path: 'district-officer',
    loadChildren: () =>
      import('./district-officer/district-officer.module').then((m) => m.DistrictOfficerModule),
  },
  {
    path: 'department-staff',
    loadChildren: () =>
      import('./department-staff/department-staff.module').then((m) => m.DepartmentStaffModule),
  },
  {
    path: 'information',
    loadChildren: () =>
      import('./information/information.module').then((m) => m.InformationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
