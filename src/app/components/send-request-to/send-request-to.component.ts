import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-send-request-to',
  templateUrl: './send-request-to.component.html',
  styleUrls: ['./send-request-to.component.scss'],
})
export class SendRequestToComponent implements OnInit {
  @Output() outputSendRequestTo = new EventEmitter();

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

  public sendRequestForm: FormGroup<{
    ads_code: FormControl<string>;
    reason: FormControl<string>;
    advertising_form: FormControl<string>;
    position_type: FormControl<string>;
    type_of_billboard: FormControl<string>;
    width: FormControl<number>;
    height: FormControl<number>;
  }>;
  public isExistsAdsCode = true;
  constructor(
    private fb: NonNullableFormBuilder,
    private crudService: CrudService
  ) {
    this.sendRequestForm = this.fb.group({
      ads_code: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      advertising_form: [''],
      position_type: [''],
      type_of_billboard: [''],
      width: [0],
      height: [0],
    });
  }

  ngOnInit() {}

  handleSendRequestTo() {
    this.outputSendRequestTo.emit({ ...this.sendRequestForm.value });
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
          console.log('----getAdvertisingPanelsByADSCODE', response);
          const result = response.data[0].data;
          if (result) {
            const formControls = this.sendRequestForm.controls;
            formControls['advertising_form']?.setValue(result.advertising_form);
            formControls['position_type']?.setValue(result.position_type);
            formControls['type_of_billboard']?.setValue(
              result.type_of_billboard
            );
            formControls['width']?.setValue(result.width);
            formControls['height']?.setValue(result.height);
            this.handleSendRequestTo();
            this.isExistsAdsCode = true;
          }
        }else this.isExistsAdsCode = false
      });
  }
}
