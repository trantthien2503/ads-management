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
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.getDatas();
  }

  getDatas() {
    const observable1 = this.crudService.get('reports');
    const observable2 = this.crudService.get('licensing-ads');
    const observable3 = this.crudService.get('users');
    forkJoin([observable1, observable2, observable3]).subscribe(
      ([response1, response2, response3]: any) => {
        if (response1) {
          const data: any[] = response1.data;
          const dataPoints: { label: string; y: number }[] = [];

          this.typeReports.forEach((report) => {
            const count = data.filter((item) => item.type === report.value).length;
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
        if (response2 && response3) {
          this.users = response3.data;
          const data: any[] = response2.data;
          const dataPoints: { label: string; y: number }[] = [];
          this.users.forEach((user)=>{
            const count = data.filter((item) => item.user_id === user.id).length;
            if (count > 0) {
              const add = {
                label: user.email,
                y: count,
              };
              dataPoints.push(add);
            }
          })

          this.pieChartOptions1.data[0].dataPoints = dataPoints;

        }

      }
    );
  }
}
