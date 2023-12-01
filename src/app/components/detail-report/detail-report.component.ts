import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css'],
})
export class DetailReportComponent implements OnInit {
  @Input() data: any;
  @Output() outputCompleteReport: EventEmitter<any> = new EventEmitter();
  validateForm: FormGroup<{
    email: FormControl<string>;
    full_name: FormControl<string>;
    isProcess: FormControl<boolean>;
    nameDistrict: FormControl<string>;
    nameWard: FormControl<string>;
    phone_number: FormControl<string>;
    to_district: FormControl<number>;
    to_ward: FormControl<number>;
    type_label: FormControl<string>;
    ads_code: FormControl<string>;
    content: FormControl<string>;
  }>;

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

  public images: Array<any> = [];
  constructor(
    private provinceService: ProvinceService,
    private fb: NonNullableFormBuilder
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      full_name: [''],
      isProcess: [false],
      nameDistrict: [''],
      nameWard: [''],
      phone_number: [''],
      to_district: [0],
      to_ward: [0],
      type_label: [''],
      ads_code: [''],
      content: [''],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.validateForm = this.fb.group({
        email: [this.data.email, [Validators.email, Validators.required]],
        full_name: [this.data.full_name],
        isProcess: [this.data.isProcess],
        nameDistrict: [this.data.nameDistrict],
        nameWard: [this.data.nameWard],
        phone_number: [this.data.phone_number],
        to_district: [this.data.to_district],
        to_ward: [this.data.to_ward],
        type_label: [this.generateTypeReport(this.data.type)],
        ads_code: [this.data.ads_code],
        content: [this.data.content],
      });
      if (this.data.images) this.images = this.data.images;
    }
  }

  generateTypeReport(type: number) {
    return this.typeReports.find((find) => find.value === type).label;
  }


  completeReport(){
    this.validateForm.controls['isProcess'].setValue(true);
    this.outputCompleteReport.emit({isProcess: true})
  }
}
