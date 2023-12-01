import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsmapComponent } from './jsmap/jsmap.component';
import { MaterialModule } from '../material.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { DetailReportComponent } from './detail-report/detail-report.component';
import { NgZorroAntModule } from '../ng-zorro-ant.module';
import * as mapboxgl from 'mapbox-gl';
import { AdvertisingLocationInformationComponent } from './advertising-location-information/advertising-location-information.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SendRequestToComponent } from './send-request-to/send-request-to.component';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoidHJhbnR0aGllbjI1MDMiLCJhIjoiY2xwOXMzZmwxMDA1dzJscGtteGliYXlyeiJ9.LmRPXRxz4pWjnAe2gbEmXA';
const component = [
  JsmapComponent,
  LoginFormComponent,
  RegisterFormComponent,
  LoginAndRegisterComponent,
  MatSpinnerOverlayComponent,
  DetailReportComponent,
  AdvertisingLocationInformationComponent,
  SendRequestToComponent
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxCaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntModule,
    GoogleMapsModule,
    EditorModule,
  ],
  declarations: component,
  exports: component,
})
export class ComponentsModule {}
