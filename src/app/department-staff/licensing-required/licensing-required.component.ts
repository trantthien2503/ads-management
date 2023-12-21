import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-licensing-required',
  templateUrl: './licensing-required.component.html',
  styleUrls: ['./licensing-required.component.css'],
})
export class LicensingRequiredComponent implements OnInit {
  public loading = false;
  selectedIndex = 0;
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    setInterval(() => {
      Promise.all([this.getLicensingAds(), this.getEditAds()]);

    }, 1000);
    this.loading = true;

  }

  public titleLicensing = 'Yêu cầu cấp phép';
  licensingAdsCount: number = 0;
  licensingAdsList: Array<any> = [];
  getLicensingAds() {
    this.crudService.get('licensing-ads').subscribe({
      next: ({ data }) => {
        if (data) {
          this.licensingAdsList = data;
          this.licensingAdsCount = this.licensingAdsList.filter(
            (filter) => filter.isViewed == false
          ).length;
        }
      },
    });
  }

  public titleEdit = 'Yêu cầu chỉnh sửa';
  editAdsCount: number = 0;
  editAdsList: Array<any> = [];
  getEditAds() {
    this.crudService.find('reports', 'type', 1).subscribe({
      next: ({ data }) => {
        if (data) {
          this.editAdsList = data;
          this.editAdsCount = this.editAdsList.filter(
            (filter) => filter.isViewed == false
          ).length;
        }
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }

  isVisibleModal = false;
  public modalCancel = () => (this.isVisibleModal = false);
  public modalOpen = () => (this.isVisibleModal = true);

}
