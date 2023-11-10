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
  public userCurrent: any = null;
  constructor(private router: Router, private matDialog: MatDialog) {}
  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.userCurrent = JSON.parse(stringUser);
      console.log('---userCurrent', this.userCurrent);

      this.navigateByRoleUser(this.userCurrent.role);
    }
  }

  openLogin() {
    this.matDialog
      .open(LoginAndRegisterComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (result.user) {
            this.userCurrent = result.user;
            const stringUser = JSON.stringify(result.user);
            localStorage.setItem('user', stringUser);
            this.navigateByRoleUser(this.userCurrent.role);
          }
        }
      });
  }

  logout() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      localStorage.removeItem('user');
      this.userCurrent = null;
    }
    this.router.navigateByUrl('/people');
  }

  navigateByRoleUser(role: string) {
    switch (role) {
      case '1':
        this.router.navigateByUrl('/people');
        break;
      case '2':
        this.router.navigateByUrl('/ward-officials');
        break;
      case '3':
        this.router.navigateByUrl('/district-officer');
        break;
      case '4':
        this.router.navigateByUrl('/department-staff');
        break;
    }
  }
}
