import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { MailOptions } from 'src/app/interface/interfaces';
import { CrudService } from 'src/app/services/crud.service';
import { EmailService } from 'src/app/services/email.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-licensing',
  templateUrl: './licensing.component.html',
  styleUrls: ['./licensing.component.css'],
})
export class LicensingComponent implements OnInit {
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
    private emailService: EmailService
  ) {}

  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.getLicensingByUserID(JSON.parse(stringUser).id);
      this.userCurrent = JSON.parse(stringUser);
    }
    this.loading = true;
  }

  generateTypeReport(type: number) {
    return this.typeReports.find((find) => find.value === type).label;
  }

  /** Hàm thực hiện lấy các báo cáo liên quan đến phường đó
   *
   * @param user_id
   */
  getLicensingByUserID(user_id: any) {
    this.crudService
      .find('licensing-ads', 'user_id', user_id)
      .subscribe((response: any) => {
        if (response?.data) {
          console.log('getLicensingByUserID', response.data);
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
    this.licensingSelected = data;
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
    this.licensingSelected = {};
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
      this.licensingSelected.isProcess = event.isProcess;
      const data = {
        ...this.licensingSelected,
      };
      this.update('reports', this.licensingSelected.id, data);
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

  public dataLicensingAds: any;
  outputLicensingAds(event: any) {
    if (event) {
      this.dataLicensingAds = event;
      console.log('outputLicensingAds', this.dataLicensingAds);
    }
  }

  /** Hàm thực hiện gửi Form cho ở VH-TT
   *
   */
  submitForm() {
    if (this.dataLicensingAds) {
      const data = {
        field: 'licensing-ads',
        data: {
          ...this.dataLicensingAds,
          user_id: this.userCurrent.id,
          isProcess: false,
          isViewed: false,
          isCancel: false,
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

  /** Hủy yêu cầu xin cấp phép ads
   *
   * @param data
   */
  cancelLicensiing(data: any) {
    let text = 'Bạn chắc hủy yêu cầu này!\nChọn đồng ý hoặc không.';
    if (confirm(text) == true) {
      data.isCancel = true;
      const dataUpdate = {
        ...data,
      };
      this.update('licensing-ads', this.licensingSelected.id, dataUpdate);
      this.openSnackBar('Đã hủy thành công', 'Ok');
      this.close();
    }
  }
}
