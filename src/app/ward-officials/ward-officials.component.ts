import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarkerAndColor } from '../interface/interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-ward-officials',
  templateUrl: './ward-officials.component.html',
  styleUrls: ['./ward-officials.component.css'],
})
export class WardOfficialsComponent implements OnInit {
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
                  map.data?.ward_code == this.userCurrent.ward
              );
              this.loading = true;
            }
          }
        },
        (err) => (this.loading = true)
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
