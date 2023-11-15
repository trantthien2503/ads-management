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
const component = [
  JsmapComponent,
  LoginFormComponent,
  RegisterFormComponent,
  LoginAndRegisterComponent,
  MatSpinnerOverlayComponent,
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxCaptchaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: component,
  exports: component,
})
export class ComponentsModule {}
