import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardOfficialsComponent } from './ward-officials.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
import { LicensingComponent } from './licensing/licensing.component';
import { ListOfAdsComponent } from './list-of-ads/list-of-ads.component';
import { ReportFromPeopleComponent } from './report-from-people/report-from-people.component';
import { NgZorroAntModule } from '../ng-zorro-ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EmailService } from '../services/email.service';

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
    NgZorroAntModule,
    EditorModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [WardOfficialsComponent, LicensingComponent, ListOfAdsComponent, ReportFromPeopleComponent],
  providers: [EmailService],
})
export class WardOfficialsModule {}
