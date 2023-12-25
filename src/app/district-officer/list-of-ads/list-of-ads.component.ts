import { Component, OnInit } from '@angular/core';
import { MarkerAndColor } from 'src/app/interface/interfaces';
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
  public district?: any;
  public adsList: Array<any> = [];
  public markerSelected?: MarkerAndColor;
  public wardSelect = 0;
  constructor(
    private provinceService: ProvinceService,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.provinceService.getProvenceHCM().subscribe((response: any) => {
        if (response) {
          const district = response.districts.find(
            (find: any) => find.code == JSON.parse(stringUser).district
          );
          if (district) {
            this.district = district;
            this.ward = district.wards;
          }
        }
      });

      this.getAdsByCodeWard(JSON.parse(stringUser).district);
      this.userCurrent = JSON.parse(stringUser);
    }
    this.loading = true;
  }

  public listFilter: Array<any> = []
  getAdsByCodeWard(code: any) {
    this.crudService
      .find('advertising-panels', 'district_code', code)
      .subscribe((response: any) => {
        if (response?.data) {
          console.log('---response.data;', response.data);

          this.adsList = response.data.map((map: any)=>{
            map['data']['address'] =  map['data']['address'] + ' - '+ this.ward.find((find: any)=> find.code == map['ward_code']).name
            return map
          });
          this.adsList = this.adsList.sort(this.compare);
          this.listFilter = this.adsList
        }
      });
  }

  compare(a: any, b: any) {
    if (a.ads_code < b.ads_code) {
      return -1;
    }
    if (a.ads_code > b.ads_code) {
      return 1;
    }
    return 0;
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  seeDetail(data: any) {
    this.markerSelected = data;
    this.open();
  }

  changeWard(event: any){
    if(event == 0) this.getAdsByCodeWard(this.district.code);
    else this.adsList =this.listFilter.filter((filter: any) => filter.ward_code == event)
  }
}
