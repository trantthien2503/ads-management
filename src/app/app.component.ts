import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ads-management';
  public userCurrent = null;
  constructor(private router: Router, private matDialog: MatDialog) {}
  ngOnInit() {

    this.router.navigateByUrl('/people');
    const stringUser = localStorage.getItem('user')
    if(stringUser){
      this.userCurrent = JSON.parse(stringUser);
    }
  }

  openLogin() {
    this.matDialog
      .open(LoginAndRegisterComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if(result){
          if(result.user){
            this.userCurrent = result.user
            const stringUser = JSON.stringify(result.user);
            localStorage.setItem('user', stringUser);
          }
        }
      });
  }


}
