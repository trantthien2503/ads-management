import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardOfficialsComponent } from './ward-officials.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
import { LicensingComponent } from './licensing/licensing.component';
import { ListOfAdsComponent } from './list-of-ads/list-of-ads.component';
import { ReportFromPeopleComponent } from './report-from-people/report-from-people.component';

const routes: Routes = [
  {
    path: '',
    component: WardOfficialsComponent,
  },
  {
    path: 'licensing',
    component: LicensingComponent,
  },
  {
    path: 'list-of-ads',
    component: ListOfAdsComponent,
  },
  {
    path: 'report-from-people',
    component: ReportFromPeopleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [WardOfficialsComponent],
})
export class WardOfficialsModule {}
