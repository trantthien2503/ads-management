import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ads-management';
  public userCurrent: any = null;
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private crudService: CrudService
  ) {}
  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.userCurrent = JSON.parse(stringUser);
      console.log('---userCurrent', this.userCurrent);

      this.navigateByRoleUser(this.userCurrent.role);
      this.callRealtimeServer();
    } else {
      this.navigateByRoleUser(1);
    }
  }

  /** Hàm thực hiện gọi server liên tục
   *
   */
  callRealtimeServer() {
    setInterval(() => {
      if (this.userCurrent.role == 2) this.getReportWard(this.userCurrent.ward);
    }, 5000);
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

  navigateByRoleUser(role: number) {
    switch (role) {
      case 2:
        this.router.navigateByUrl('/ward-officials');
        break;
      case 3:
        this.router.navigateByUrl('/district-officer');
        break;
      case 4:
        this.router.navigateByUrl('/department-staff');
        break;
      default:
        this.router.navigateByUrl('/people');
        break;
    }
  }

  reportWardCount: number = 0;
  getReportWard(ward_code: any) {
    this.crudService
      .find('reports', 'to_ward', ward_code)
      .subscribe((response: any) => {
        if (response?.data) {
          this.reportWardCount = response.data.filter(
            (filter: any) =>
              filter.isProcess == false && filter.isViewed == false
          ).length;
        }
      }, error =>{
        console.log('---getReportWard', error);

      });
  }
}
