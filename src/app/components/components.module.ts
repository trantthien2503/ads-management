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
import { LicensingAdsComponent } from './licensing-ads/licensing-ads.component';
import { DetailLicensingAdsComponent } from './detail-licensing-ads/detail-licensing-ads.component';
import { ListAdvertisingFormComponent } from './list-advertising-form/list-advertising-form.component';
import { ListBillboardComponent } from './list-billboard/list-billboard.component';
import { ListPositionTypeComponent } from './list-position-type/list-position-type.component';
import { ListAdsComponent } from './list-ads/list-ads.component';
import { ListEditRequestComponent } from './list-edit-request/list-edit-request.component';
import { ListLicensingRequiredComponent } from './list-licensing-required/list-licensing-required.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailService } from '../services/email.service';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoidHJhbnR0aGllbjI1MDMiLCJhIjoiY2xwOXMzZmwxMDA1dzJscGtteGliYXlyeiJ9.LmRPXRxz4pWjnAe2gbEmXA';
const component = [
  JsmapComponent,
  LoginFormComponent,
  RegisterFormComponent,
  LoginAndRegisterComponent,
  MatSpinnerOverlayComponent,
  DetailReportComponent,
  AdvertisingLocationInformationComponent,
  SendRequestToComponent,
  LicensingAdsComponent,
  DetailLicensingAdsComponent,
  ListPositionTypeComponent,
  ListBillboardComponent,
  ListAdvertisingFormComponent,
  ListAdsComponent,
  ListEditRequestComponent,
  ListLicensingRequiredComponent,
  DetailUserComponent,
  ResetPasswordComponent
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
  providers: [EmailService,]
})
export class ComponentsModule {}
