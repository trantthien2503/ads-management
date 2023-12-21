import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrls: ['./list-ads.component.css'],
})
export class ListAdsComponent implements OnInit {
  public dataPositions: Array<any> = [];
  public isVisibleModal = false;
  public newPositionType = '';
  public advertisingList: Array<any> = [];
  public billboardList: Array<any> = [];
  public positionTypeList: Array<any> = [];

  constructor(
    private crudService: CrudService,
    private _snackBar: MatSnackBar,
    private provinceService: ProvinceService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const advertisingforms = this.crudService.get('advertising-forms');
    const billboards = this.crudService.get('billboards');
    const positionTypes = this.crudService.get('position-types');
    const advertisingPanels = this.crudService.get('advertising-panels');

    forkJoin([
      advertisingforms,
      billboards,
      positionTypes,
      advertisingPanels,
    ]).subscribe({
      next: ([
        resAdvertisingforms,
        resBillboards,
        resPositionTypes,
        resAdvertisingPanels,
      ]: any) => {
        if (resAdvertisingforms)
          this.advertisingList = resAdvertisingforms.data;
        if (resBillboards) this.billboardList = resBillboards.data;
        if (resPositionTypes) this.positionTypeList = resPositionTypes.data;
        if (resAdvertisingPanels) {
          resAdvertisingPanels.data.map(async (map: any) => {
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
            if (!map['data']['start_date_of_advertising_contract'].length) {
              map['data']['start_date_of_advertising_contract'] = new Date();
            }
            if (!map['data']['expiry_date_of_advertising_contract'].length) {
              map['data']['expiry_date_of_advertising_contract'] = new Date();
            }
            return map;
          });
          this.dataPositions = resAdvertisingPanels.data;
          this.dataPositions = this.dataPositions.sort(this.compare)
          this.dataPositions.forEach((item, index)=>{
            if(item){
              let name = '';
              if(index < 10 )
                name = `ads00${index}`
              if(index >= 10 && index < 100){
                name = `ads0${index}`
              }
              if(index >= 100){
                name = `ads${index}`
              }
              const update = {
                ads_code: name
              }
              this.crudService.update('advertising-panels', item.id, update)
            }
          })
        }
      },
      error: (err: any) => {
        console.log('error', err);
      },
      complete: () => {},
    });
  }

  compare(a: any, b: any) {
    if (a.ads_code < b.ads_code) {
      return -1;
    }
    if (a.ads_code > b.ads_code) {
      return 1;
    }
    return 0;
  }

  update(dataUpdate: any) {
    setTimeout(() => {
      if (dataUpdate) {
        this.crudService
          .update('advertising-panels', dataUpdate.id, { ...dataUpdate })
          .subscribe(() => {
            console.log('Cập nhật thành công');
          });
      }
    }, 500);
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
