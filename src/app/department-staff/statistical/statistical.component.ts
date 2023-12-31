import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css'],
})
export class StatisticalComponent implements OnInit {
  pieChartOptions1 = {
    animationEnabled: true,
    title: {
      text: '',
    },
    theme: 'light1', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'pie',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
        ],
      },
    ],
  };

  pieChartOptions2 = {
    animationEnabled: true,
    title: {
      text: '',
    },
    theme: 'light1', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'pie',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
        ],
      },
    ],
  };

  public typeReports: Array<any> = [
    {
      value: 0,
      label: 'Tố giác sai phạm',
    },
    {
      value: 1,
      label: 'Đăng ký nội dung',
    },
    {
      value: 2,
      label: 'Đóng góp ý kiến',
    },
    {
      value: 3,
      label: 'Giải đáp thắc mắc',
    },
  ];

  public reports: Array<any> = [];
  public licensingADS: Array<any> = [];
  public users: Array<any> = [];
  public advertisingPanels: Array<any> = [];
  public loading = false;
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.getDatas();
  }

  getDatas() {
    this.loading = false;
    const observable1 = this.crudService.get('reports');
    const observable2 = this.crudService.get('licensing-ads');
    const observable3 = this.crudService.get('users');
    const observable4 = this.crudService.get('advertising-panels');
    forkJoin([observable1, observable2, observable3, observable4]).subscribe({
      next: ([response1, response2, response3, response4]: any) => {
        if (response1) {
          const data: any[] = response1.data;
          const dataPoints: { label: string; y: number }[] = [];

          this.typeReports.forEach((report) => {
            const count = data.filter(
              (item) => item.type === report.value
            ).length;
            if (count > 0) {
              const add = {
                label: report.label,
                y: count,
              };
              dataPoints.push(add);
            }
          });

          this.pieChartOptions2.data[0].dataPoints = dataPoints;
        }
        if (response2 && response3 && response4) {

          this.advertisingPanels = response4.data;
          this.users = response3.data;
          const data: any[] = response2.data;
          const dataPoints: { label: string; y: number }[] = [];
          this.advertisingPanels.forEach((item) => {
            const count = data.filter(
              (filter) => filter.ads_code === item.ads_code
            ).length;
            if (count > 0) {
              const add = {
                label: `Điểm yêu cầu ${item.ads_code}`,
                y: count,
              };
              dataPoints.push(add);
            }
          });

          this.pieChartOptions1.data[0].dataPoints = dataPoints;
        }
      },
      complete: () => (this.loading = true),
    });
  }
}
