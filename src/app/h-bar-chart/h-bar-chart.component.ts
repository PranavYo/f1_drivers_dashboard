import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AppService } from '../app.service';

@Component({
  selector: 'app-h-bar-chart',
  templateUrl: './h-bar-chart.component.html',
  styleUrls: ['./h-bar-chart.component.scss']
})
export class HBarChartComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  constructor(private appService: AppService) { }

  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#3A4374',
          font: {
            size: 16
          }
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [...this.labels],
    datasets: [
      {
        data: [...this.data],
        label: 'Race Wins',
        backgroundColor: 'orchid'
      }
    ],
  };

  updateData() {
    this.appService.apiDriversDataRecived$.subscribe(() => {
      this.barChartData = {
        labels: [...this.labels],
        datasets: [
          {
            data: [...this.data],
            label: 'Race Wins',
            backgroundColor: 'orchid'
          }
        ],
      };
    });
  }

  ngOnInit(): void {
    this.updateData();
  }
}
