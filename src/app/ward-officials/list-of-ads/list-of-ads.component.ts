import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-list-of-ads',
  templateUrl: './list-of-ads.component.html',
  styleUrls: ['./list-of-ads.component.css'],
})
export class ListOfAdsComponent implements OnInit {
  public userCurrent: any;
  public loading = false;
  public dataReportByEmail: Array<any> = [];
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
  public ward?: any;
  public adsList: Array<any> = [];
  constructor(
    private provinceService: ProvinceService,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.provinceService
        .getWard(JSON.parse(stringUser).ward)
        .subscribe((response: any) => {
          if (response) {
            this.ward = response;
          }
        });
      this.getAdsByCodeWard(JSON.parse(stringUser).ward);
      this.userCurrent = JSON.parse(stringUser);
    }
    this.loading = true;
  }

  getAdsByCodeWard(code: any) {
    this.crudService
      .find('advertising-panels', 'ward_code', code)
      .subscribe((response: any) => {
        if (response?.data) {
          console.log('---response.data;', response.data);

          this.adsList = response.data;
        }
      });
  }
}
