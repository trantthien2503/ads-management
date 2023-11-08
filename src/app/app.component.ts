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
  constructor(private router: Router, private matDialog: MatDialog) {}
  ngOnInit() {
    this.router.navigateByUrl('/people');
  }

  openLogin() {
    this.matDialog
      .open(LoginAndRegisterComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
