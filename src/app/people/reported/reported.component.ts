import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';


@Component({
  selector: 'app-reported',
  templateUrl: './reported.component.html',
  styleUrls: ['./reported.component.css'],
})
export class ReportedComponent implements OnInit {
  public loading = true;
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
  constructor(
    private crudService: CrudService,
    private provinceService: ProvinceService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {}

  search() {
    this.loading = false;
    this.crudService.find('reports', 'email', this.emailSearch).subscribe(
      (response: any) => {
        if (response) {
          console.log('---search', response);
          if (response.data) {
            response.data.map(async (map: any) => {
              let observable = [];
              let resultsObservable: any = [];

              if (map.to_district) {
                observable.push(
                  this.provinceService.getDistrict(map.to_district)
                );
              }
              if (map.to_ward) {
                observable.push(this.provinceService.getWard(map.to_ward));
              }

              await forkJoin(observable)
                .toPromise()
                .then((results) => {
                  if (results) {
                    resultsObservable = results;
                    map['nameDistrict'] = results[0]?.name;
                    map['nameWard'] = results[1]?.name;
                  }
                });

              return map;
            });

            this.dataReportByEmail = response.data;
            console.log('---this.dataReportByEmail', this.dataReportByEmail);
          }
          this.loading = true;
        }
      },
      (erorr) => (this.loading = true)
    );
  }

  generateTypeReport(type: number) {
    return this.typeReports.find((find) => find.value === type).label;
  }


  /** Hàm thực hiện xem chi báo cáo
   *
   * @param data
   */
  seeDetail(data: any) {
    // this.matDialog.open(DetailReportComponent, {
    //   height: '400px',
    //   width: '600px',
    //   data: data,
    // }).afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  /** Hàm thực xóa báo với vị tri
   *
   * @param position
   */
  deleteDetail(position: number){

  }
}
