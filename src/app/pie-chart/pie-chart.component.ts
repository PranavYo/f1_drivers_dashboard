import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  constructor(private appService: AppService) { }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  updateInputData() {
    this.appService.apiDriversDataRecived$.subscribe(() => {
        setTimeout(() => {
          this.pieChartData = {
            labels: [...this.labels],
            datasets: [
              {
                data: [...this.data],
                backgroundColor: ['#59649f', 'orchid']
              },
            ],
          };
        }, 2000);
      });
  }

  ngOnInit(): void {
    this.updateInputData();
  }
}
