import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsmapComponent } from './jsmap/jsmap.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [JsmapComponent],
  exports: [JsmapComponent]
})
export class ComponentsModule { }
