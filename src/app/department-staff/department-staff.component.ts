import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarkerAndColor } from '../interface/interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-department-staff',
  templateUrl: './department-staff.component.html',
  styleUrls: ['./department-staff.component.css']
})
export class DepartmentStaffComponent implements OnInit {

  markers: MarkerAndColor[] = [];
  public markerSelected?: MarkerAndColor;
  public loading = false;

  constructor(private crudService: CrudService, private router: Router) {
    this.crudService.get('advertising-panels').subscribe(
      (response: any) => {
        if (response) {
          if (response.data) {
            this.markers = response.data;
            this.loading = true;
          }
        }
      },
      (err) => (this.loading = true)
    );
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
