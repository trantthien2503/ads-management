import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [PeopleComponent]
})
export class PeopleModule { }
