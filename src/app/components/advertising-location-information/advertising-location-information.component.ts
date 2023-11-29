import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DataMarker, MarkerAndColor } from 'src/app/interface/interfaces';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-advertising-location-information',
  templateUrl: './advertising-location-information.component.html',
  styleUrls: ['./advertising-location-information.component.scss'],
})
export class AdvertisingLocationInformationComponent implements OnInit {
  @Input() isPeople?: boolean = false;
  @Input() marker?: MarkerAndColor;
  @Output() outputReportAdvertising: EventEmitter<any> = new EventEmitter();
  public dataMarker?: DataMarker;
  public district: any;
  public ward: any;
  constructor(private provinceService: ProvinceService) {}

  ngOnInit() {
    if (this.marker) {
      if (this.marker.data) {
        if (this.marker.data.ward_code) {
          this.provinceService
            .getWard(this.marker.data.ward_code)
            .subscribe((response: any) => {
              if (response) {
                this.ward = response;
              }
            });
        }
        if (this.marker.data.district_code) {
          this.provinceService
            .getDistrict(this.marker.data.district_code)
            .subscribe((response: any) => {
              if (response) {
                this.district = response;
              }
            });
        }
      }
      this.dataMarker = this.marker.data;
    }
  }

  reportAdvertising(){
    this.outputReportAdvertising.emit(true);
  }
}
