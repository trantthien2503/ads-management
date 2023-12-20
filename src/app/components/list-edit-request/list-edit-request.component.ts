import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

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
    private _snackBar: MatSnackBar,
    private provinceService: ProvinceService
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
}
