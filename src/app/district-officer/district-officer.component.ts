import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarkerAndColor } from '../interface/interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-district-officer',
  templateUrl: './district-officer.component.html',
  styleUrls: ['./district-officer.component.css']
})
export class DistrictOfficerComponent implements OnInit {

  markers: MarkerAndColor[] = [];
  public markerSelected?: MarkerAndColor;
  public loading = false;
  public userCurrent: any;
  constructor(private crudService: CrudService, private router: Router) {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.userCurrent = JSON.parse(stringUser);
      this.crudService.get('advertising-panels').subscribe(
        (response: any) => {
          if (response) {
            if (response.data) {
              this.markers = response.data;
              this.markers = this.markers.filter(
                (map: MarkerAndColor) =>
                  map.data?.district_code == this.userCurrent.district
              );
              this.loading = true;
            }
          }
        },
        (err) => {
          this.loading = true;
          console.log('err', err);
        }
      );
    }
  }

  ngOnInit() {}

  outputChooseMarker(event: any) {
    if (event) {
      console.log('----outputChooseMarker', event);
      this.markerSelected = event;
      this.open();
    }
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  outputReportAdvertising(event: any) {
    if (event) {
      this.close();
    }
  }

}
