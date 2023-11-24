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
  constructor(private crudService: CrudService) {
    this.crudService.get('advertising-panels').subscribe(
      (response: any) => {
        if (response) {
          if (response.data) {
            console.log('--advertising-panels', response.data);

            this.markers = response.data;
          }
        }
      },
      (err) => console.error('---err', err)
    );
  }

  ngOnInit() {}

  outputChooseMarker(event: any){
    if(event){
      console.log('----outputChooseMarker', event);
      this.open()
    }
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
