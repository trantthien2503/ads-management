import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent implements OnInit {
  public isLogin = true;
  constructor(
    public dialogRef: MatDialogRef<LoginAndRegisterComponent>,
  ) { }

  ngOnInit() {
  }

  isLoginSuccess(event: any){
    if(event){
      this.dialogRef.close(event);
    }
  }

  isRegisterSuccess(event: any){
    if(event) this.isLogin = true;
  }
}
