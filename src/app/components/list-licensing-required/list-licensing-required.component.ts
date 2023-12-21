import { filter } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
                map['from_email'] = results[0]?.data[0].email;
              }
            });

          return map;
        });
        this.dataPositions = response.data.filter((filter: any) => filter.isCancel == false);
      }
    });
  }


  changeViewed(event: any, idUpdate: string) {
    if (event) {
      const update = {
        isViewed: event,
      };
      this.update('licensing-ads', idUpdate, update);
    }
  }

  /** Hàm thực hiện câp nhật theo trường
   *
   * @param field: Tên collection 'reports'
   * @param idUpdate: id trường
   * @param objectUpdate: dữ liệu cập nhât
   * vd: update = {
        isViewed: event
      }
   */
  update(field: string, idUpdate: string, objectUpdate: any) {
    this.crudService
      .update(field, idUpdate, objectUpdate)
      .subscribe((response: any) => {
        if (response) {
          console.log('----update', response);
        }
      });
  }


  updateProcess(event: any, data: any) {
    if (event == true) {
      const update = {
        isProcess: event,
      };
      this.update('licensing-ads', data.id, update);
      data.isViewed = true;
      this.changeViewed(data.isViewed, data.id);
    }
  }
}
