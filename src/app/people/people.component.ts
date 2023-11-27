import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { MarkerAndColor } from '../interface/interfaces';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
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
      this.router.navigateByUrl('/people/report');
    }
  }
}
