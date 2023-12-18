import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-licensing-ads',
  templateUrl: './licensing-ads.component.html',
  styleUrls: ['./licensing-ads.component.css']
})
export class LicensingAdsComponent implements OnInit {

  @Output() outputLicensingAds = new EventEmitter();

  public listAdvertising: Array<any> = [
    {
      label: 'Không thay đổi',
      value: '',
    },
    {
      label: 'Cổ động chính trị',
      value: 'Cổ động chính trị',
    },
    {
      label: 'Quảng cáo thương mại',
      value: 'Quảng cáo thương mại',
    },
    {
      label: 'Xã hội hoá',
      value: 'Xã hội hoá',
    },
  ];

  public listPosition: Array<any> = [
    {
      label: 'Không thay đổi',
      value: '',
    },
    {
      label: 'Đất công/Công viên/Hành lang an toàn giao thông',
      value: 'Đất công/Công viên/Hành lang an toàn giao thông',
    },
    {
      label: 'Đất tư nhân/Nhà ở riêng lẻ',
      value: 'Đất tư nhân/Nhà ở riêng lẻ',
    },
    {
      label: 'Trung tâm thương mại',
      value: 'Trung tâm thương mại',
    },
    {
      label: 'Chợ',
      value: 'ChợChợ',
    },
    {
      label: 'Cây xăng',
      value: 'Cây xăng',
    },
    {
      label: 'Nhà chờ xe buýt',
      value: 'Nhà chờ xe buýt',
    },
  ];

  public listBillboard: Array<any> = [
    {
      label: 'Không thay đổi',
      value: '',
    },
    {
      label: 'Trụ bảng hiflex',
      value: 'Trụ bảng hiflex',
    },
    {
      label: 'Trụ màn hình điện tử LED',
      value: 'Trụ màn hình điện tử LED',
    },
    {
      label: 'Trụ hộp đèn',
      value: 'Trụ hộp đèn',
    },
    {
      label: 'Bảng hiflex ốp tường',
      value: 'Bảng hiflex ốp tường',
    },
    {
      label: 'Màn hình điện tử ốp tường',
      value: 'Màn hình điện tử ốp tường',
    },
    {
      label: 'Trụ treo băng rôn dọc',
      value: 'Trụ treo băng rôn dọc',
    },
    {
      label: 'Trụ treo băng rôn ngang',
      value: 'Trụ treo băng rôn ngang',
    },
    {
      label: 'Trụ/Cụm pano',
      value: 'Trụ/Cụm pano',
    },
    {
      label: 'Cổng chào',
      value: '',
    },
    {
      label: 'Cổng chàoi',
      value: '',
    },
    {
      label: 'Trung tâm thương mại',
      value: '',
    },
    {
      label: 'Trung tâm thương mạii',
      value: '',
    },
  ];

  public licensingADSForm: FormGroup<{
    ads_code: FormControl<string>;
    content: FormControl<string>;
    information_company: FormControl<string>;
    email_company: FormControl<string>;
    phone_company: FormControl<string>;
    address_company: FormControl<string>;
    expiry_date_of_advertising_contract: FormControl<Date>;
    start_date_of_advertising_contract: FormControl<Date>;
  }>;
  public isExistsAdsCode = true;
  constructor(
    private fb: NonNullableFormBuilder,
    private crudService: CrudService
  ) {
    this.licensingADSForm = this.fb.group({
      ads_code: ['', [Validators.required]],
      content: ['', [Validators.required]],
      information_company: [''],
      email_company: [''],
      phone_company: [''],
      address_company: [''],
      expiry_date_of_advertising_contract: [new Date],
      start_date_of_advertising_contract: [new Date],
    });
  }


  ngOnInit() {}

  handleSendRequestTo() {
    this.outputLicensingAds.emit({ ...this.licensingADSForm.value });
  }

  /** Hàm thực hiện lấy thông tin của 1 điểm quảng cáo bất kỳ
   *
   * @param code
   */
  getAdvertisingPanelsByADSCODE(code: string) {
    this.crudService
      .find('advertising-panels', 'ads_code', code)
      .subscribe((response: any) => {
        if (response?.data) {
          const result = response.data[0].data;
          if (result) {
            this.handleSendRequestTo();
            this.isExistsAdsCode = true;
          }
        }else this.isExistsAdsCode = false
      });
  }

}
