import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-detail-licensing-ads',
  templateUrl: './detail-licensing-ads.component.html',
  styleUrls: ['./detail-licensing-ads.component.css']
})
export class DetailLicensingAdsComponent implements OnInit {

  @Input() data: any;
  @Output() outputCompleteReport: EventEmitter<any> = new EventEmitter();
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

  public images: Array<any> = [];
  constructor(
    private provinceService: ProvinceService,
    private fb: NonNullableFormBuilder
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

  ngOnInit() {
    if (this.data) {
      this.licensingADSForm = this.fb.group({
        ads_code: [this.data.ads_code, [Validators.required]],
        content: [this.data.content, [Validators.required]],
        information_company: [this.data.information_company],
        email_company: [this.data.email_company],
        phone_company: [this.data.phone_company],
        address_company: [this.data.address_company],
        expiry_date_of_advertising_contract: [this.data.expiry_date_of_advertising_contract],
        start_date_of_advertising_contract: [this.data.start_date_of_advertising_contract],
      });
    }
  }



  completeReport(){
    this.outputCompleteReport.emit({isProcess: true})
  }

}
