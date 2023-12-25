import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailOptions } from 'src/app/interface/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() isLoginSuccess = new EventEmitter();
  public loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private emailService: EmailService,
    private crudService: CrudService,
    private _snackBar: MatSnackBar,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public isVisibleModal = false;

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((response: any) => {
          if (response) {
            if (response.user)
              this.isLoginSuccess.emit({ user: response.user });
          }
        });
    }
  }

  modalCancel() {
    this.isVisibleModal = false;
  }

  modalOpen() {
    this.isVisibleModal = true;
  }

  public mailResetString = '';

  mailReset(event: any) {
    if (event) {
      this.mailResetString = event.mail_reset;
    }
  }
  wait = false;
  userReset: any;
  resetPassword() {
    this.crudService
      .find('users', 'email', this.mailResetString)
      .subscribe(({ data }) => {
        this.userReset = data?.[0];
        if (this.userReset) {
          this.authService
            .generateVerificationCode()
            .subscribe(({ verification_code }) => {
              const dataMail: MailOptions = {
                sender_email: 'trantthien2503@gmail.com',
                sender_name: 'trantthien2503',
                recipient_email: this.mailResetString,
                recipient_name: this.mailResetString,
                subject: 'Mail OTP đặt lại mật khẩu',
                text_content: 'text_content',
                html_content: `
            <html>
            <head>
              <style>
                /* CSS cho email */
                body {
                  font-family: Arial, sans-serif;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f5f5f5;
                }
                .logo {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .logo img {
                  max-width: 150px;
                }
                .content {
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .title {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                .text {
                  margin-bottom: 20px;
                }
                .verification-code {
                  font-size: 18px;
                  font-weight: bold;
                  color: #007bff;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo">
                <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="16" alt="" loading="lazy"
                style="margin-top: -1px">
                </div>
                <div class="content">
                  <div class="title">Mã xác minh</div>
                  <div class="text">
                    <p>Xin chào,</p>
                    <p>Dưới đây là mã xác minh của bạn để đặt lại mật khẩu:</p>
                  </div>
                  <div class="verification-code">${verification_code}</div>
                </div>
              </div>
            </body>
          </html>`,
                custom_id: 'custom_id',
              };
              this.emailService.sendEmail(dataMail).subscribe(() => {
                console.log('---gửi mail thành công');
                this.wait = true;
              });
            });
        }
      });
  }

  public verificationCode = '';
  checkVerificationCode(code: string) {
    this.authService.checkVerificationCode(code).subscribe((response) => {
      if (response) {
        console.log('checkVerificationCode', response);
        if (response.result) {
          const { result } = response;
          if (result == true) {
            this.wait = false;
            this.modalCancel();
            this.prePasswordOpen();
          }
        }
        this.openSnackBar(response.message, 'Ok')

      }
    });
  }

  isVisiblePrePassword = false;
  passwordVisible = false;
  public preResetPasswordForm: FormGroup = this.fb.group({
    new_password: ['', [Validators.required]],
    pre_new_password: ['', [Validators.required]],
  });

  prePasswordCancel = () => (this.isVisiblePrePassword = false);
  prePasswordOpen = () => (this.isVisiblePrePassword = true);

  updatePassword() {
    if(this.userReset && this.preResetPasswordForm.valid){
      const {new_password, pre_new_password} = this.preResetPasswordForm.value;
      if(pre_new_password == new_password){
        this.crudService.update('users', this.userReset.id, {password: new_password}).subscribe((res)=>{
          if(res){
            this.openSnackBar('Cập nhật mật khẩu thành công', 'Ok')
            this.prePasswordCancel();
            this.mailResetString = '';
            this.verificationCode = ''
          }
        })
      }else this.openSnackBar('Mật khẩu mới và mật khẩu xác nhận không trùng', 'Ok')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
