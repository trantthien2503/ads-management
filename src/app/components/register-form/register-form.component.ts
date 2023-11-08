import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { captcha } from 'src/apis/captcha';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem: any;

  public roleUsers = [
    {
      label: 'Người dân',
      role: 1,
    },
    {
      label: 'Cán bộ Phường',
      role: 2,
    },
    {
      label: 'Cán bộ Quận',
      role: 3,
    },
    {
      label: 'Cán bộ Sở',
      role: 4,
    },
  ];
  public siteKey = '';

  public registerForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    phoneNumber: FormControl<string>;
    captcha: FormControl<string>;
    autoLogin: FormControl<boolean>;
    role: FormControl<number>;
  }>;
  constructor(private fb: NonNullableFormBuilder) {
    this.siteKey = captcha.siteKey;
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      phoneNumber: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      autoLogin: [false],
      role: [1],
    });
  }

  ngOnInit() {}

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  register() {
    if (this.registerForm.valid) {
      let dataRegister = this.registerForm.value;
      console.log('---dataRegister', dataRegister);
    }
  }
}
