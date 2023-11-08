import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardOfficialsComponent } from './ward-officials.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WardOfficialsComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WardOfficialsComponent]
})
export class WardOfficialsModule { }
