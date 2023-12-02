import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-report-from-people',
  templateUrl: './report-from-people.component.html',
  styleUrls: ['./report-from-people.component.css'],
})
export class ReportFromPeopleComponent implements OnInit {
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
  public reportSelected?: any; // Báo cáo được chọn
  constructor(
    private crudService: CrudService,
    private provinceService: ProvinceService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.getReportsByWardCode(JSON.parse(stringUser).ward);
      this.userCurrent = JSON.parse(stringUser);
    }
    this.loading = true;
  }

  generateTypeReport(type: number) {
    return this.typeReports.find((find) => find.value === type).label;
  }

  /** Hàm thực hiện lấy các báo cáo liên quan đến phường đó
   *
   * @param code
   */
  getReportsByWardCode(code: any) {
    this.crudService
      .find('reports', 'to_ward', code)
      .subscribe((response: any) => {
        if (response?.data) {
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
          this.dataReports = response?.data;
          this.dataReports = this.dataReports.sort(this.compare);
        }
      });
  }

  /** Hàm thực hiện xem chi báo cáo
   *
   * @param data
   */
  seeDetail(data: any) {
    this.reportSelected = data;
    this.open();
    if (data.isViewed === false) {
      data.isViewed = true;
      const update = {
        isViewed: true,
      };
      this.update('reports', data.id, update);
    }
  }

  /** Hàm thực xóa báo với vị tri
   *
   * @param position
   */
  deleteDetail(position: number) {}

  compare(a: any, b: any) {
    if (a.isViewed < b.isViewed) {
      return -1;
    }
    if (a.isViewed > b.isViewed) {
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
    this.reportSelected = {};
  }

  changeViewed(event: any, idUpdate: string) {
    if (event) {
      const update = {
        isViewed: event,
      };
      this.update('reports', idUpdate, update);
    }
  }

  /** Hàm thực hiện câp nhật theo trường
   *
   * @param field: Tên collection 'reports'
   * @param idUpdate: id trường
   * @param objectUpdate: dữ liệu cập nhât
   * vd: update = {
        isViewed: event
      }
   */
  update(field: string, idUpdate: string, objectUpdate: any) {
    this.crudService
      .update(field, idUpdate, objectUpdate)
      .subscribe((response: any) => {
        if (response) {
          console.log('----update', response);
        }
      });
  }

  outputCompleteReport(event: any) {
    if (event) {
      this.reportSelected.isProcess = event.isProcess;
      const data = {
        ...this.reportSelected,
      };
      this.update('reports', this.reportSelected.id, data);
      this.close();
    }
  }

  isVisibleModal = false; // Biền dùng để xác định ẩn hiện form gửi thông tin chỉnh sửa về swro VH-TT

  /** Hàm thực hiện đóng modal form gửi thông tin chỉnh sửa về swro VH-TT
   *
   */
  modalCancel() {
    this.isVisibleModal = false;
  }

  /** Hàm thực hiện mở modal Form gửi thông tin chỉnh sửa về swro VH-TT
   *
   */
  modalOpen() {
    this.isVisibleModal = true;
  }

  public dataSendRequestTo: any;
  outputSendRequestTo(event: any) {
    if (event) {
      this.dataSendRequestTo = event;
    }
  }

  /** Hàm thực hiện gửi Form cho ở VH-TT
   *
   */
  submitForm() {
    if (this.dataSendRequestTo) {
      const date = new Date();
      const timestampInSeconds = Math.floor(date.getTime() / 1000);
      const data = {
        field: 'reports',
        data: {
          ...this.dataSendRequestTo,
          isProcess: false,
          isViewed: false,
          type: 1,
          date: timestampInSeconds,
        },
      };
      this.crudService.add(data).subscribe((response: any) => {
        if (response) {
          this.openSnackBar('Đã gửi thành công yêu cầu', 'Ok');
        }
      });
    }
    this.modalCancel();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
