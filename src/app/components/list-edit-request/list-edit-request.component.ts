import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-list-edit-request',
  templateUrl: './list-edit-request.component.html',
  styleUrls: ['./list-edit-request.component.css'],
})
export class ListEditRequestComponent implements OnInit {
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
    this.crudService.find('reports', 'type', 1).subscribe({
      next: ({ data }) => {
        if (data) {
          console.log(data);
          this.dataPositions = data;
        }
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }

  changeViewed(event: any, idUpdate: string) {
    if (event) {
      const update = {
        isViewed: event,
      };
      this.update('reports', idUpdate, update);
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
      this.update('reports', data.id, update);
      data.isViewed = true;
      this.changeViewed(data.isViewed, data.id);
    }
  }
}
