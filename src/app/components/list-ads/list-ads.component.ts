import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrls: ['./list-ads.component.css']
})
export class ListAdsComponent implements OnInit {

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
    this.crudService.get('advertising-panels').subscribe((response: any) => {
      if (response?.data) {
        response.data.map(async (map: any) => {
          let observable = [];
          let resultsObservable: any = [];

          if (map.district_code) {
            observable.push(
              this.provinceService.getDistrict(map.district_code)
            );
          }
          if (map.ward_code) {
            observable.push(this.provinceService.getWard(map.ward_code));
          }

          await forkJoin(observable)
            .toPromise()
            .then((results) => {
              if (results) {
                resultsObservable = results;
                map['nameDistrict'] = results[0]?.name;
                map['nameWard'] = results[1]?.name;
              }
            });

          return map;
        });
        this.dataPositions = response.data;
      }
    });
  }

  createData() {
    this.modalOpen();
  }

  modalCancel() {
    this.isVisibleModal = false;
  }

  modalOpen() {
    this.isVisibleModal = true;
  }

  submitForm(value: string) {
    if (value.length) {
      const data = {
        field: 'advertising-panels',
        data: {
          name: value,
        },
      };
      this.crudService.add(data).subscribe((response: any) => {
        if (response) {
          this.openSnackBar('Đã tạo mới thành công', 'Ok');
          this.getData();
        }
      });
    }
    this.modalCancel();

    this.newPositionType = '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
