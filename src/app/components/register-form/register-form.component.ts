import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { captcha } from 'src/apis/captcha';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @Output() isRegisterSuccess = new EventEmitter();
  @Output() isLoginSuccess = new EventEmitter();

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

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
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
      let dataRegister = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phoneNumber: this.registerForm.value.phoneNumber,
        role: this.registerForm.value.role,
      };
      this.authService.register(dataRegister).subscribe((response: any) => {
        if(response.user){
          if(this.registerForm.value.autoLogin){
            this.authService.login(response.user.email, response.user.password).subscribe((responseChild: any)=>{
              if(responseChild.user){
                this.isLoginSuccess.emit({user: responseChild.user})
              }
            })
          }else{
            this.isRegisterSuccess.emit({data: null})
          }
        }
      });
    }
  }
}
