import { ReportComponent } from './report/report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { NgZorroAntModule } from '../ng-zorro-ant.module';
import { ReportedComponent } from './reported/reported.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'reported',
    component: ReportedComponent,
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
  declarations: [PeopleComponent, ReportComponent, ReportedComponent],
})
export class PeopleModule {}
