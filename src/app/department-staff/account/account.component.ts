import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public userCurrent?: any;
  public loading = false;
  public dataReports: Array<any> = [];
  public emailSearch: string = '';
  public typeReports: Array<any> = [
    {
      value: 0,
      label: 'Tố giác sai phạm',
    },
    {
      value: 1,
      label: 'Đăng ký nội dung',
    },
    {
      value: 2,
      label: 'Đóng góp ý kiến',
    },
    {
      value: 3,
      label: 'Giải đáp thắc mắc',
    },
  ];
  public licensingSelected?: any; // Báo cáo được chọn
  constructor(
    private crudService: CrudService,
    private provinceService: ProvinceService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loading = true
  }

  generateTypeReport(type: number) {
  }

  /** Hàm thực hiện lấy các báo cáo liên quan đến phường đó
   *
   * @param user_id
   */
  getLicensingByUserID(user_id: any) {

  }



}
