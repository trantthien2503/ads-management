import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-list-licensing-required',
  templateUrl: './list-licensing-required.component.html',
  styleUrls: ['./list-licensing-required.component.css']
})
export class ListLicensingRequiredComponent implements OnInit {
  public dataPositions: Array<any> = [];
  public isVisibleModal = false;
  public newPositionType = '';
  constructor(
    private crudService: CrudService,
    private _snackBar: MatSnackBar,
    private provinceService: ProvinceService,

  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.get('licensing-ads').subscribe((response: any) => {
      if (response?.data) {

        response.data.map(async (map: any) => {
          let observable = [];
          let resultsObservable: any = [];

          if (map.user_id) {
            observable.push(
              this.crudService.find('users','id',map.user_id)
            );
          }

          await forkJoin(observable)
            .toPromise()
            .then((results) => {
              if (results) {
                resultsObservable = results;
                console.log('resultsObservable', resultsObservable);

                map['from_email'] = results[0]?.data[0].email;
              }
            });

          return map;
        });
        this.dataPositions = response.data.filter((filter: any) => filter.isCancel == false);
      }
    });
  }
}
