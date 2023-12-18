import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-list-advertising-form',
  templateUrl: './list-advertising-form.component.html',
  styleUrls: ['./list-advertising-form.component.css']
})
export class ListAdvertisingFormComponent implements OnInit {

  public dataPositions: Array<any> = [];
  public isVisibleModal = false;
  public newPositionType = '';
  constructor(
    private crudService: CrudService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.get('advertising-forms').subscribe((response: any) => {
      if (response?.data) {
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
        field: 'advertising-forms',
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
