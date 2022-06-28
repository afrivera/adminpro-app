import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dougnuth',
  templateUrl: './dougnuth.component.html',
  styles: [
  ]
})
export class DougnuthComponent implements OnInit{

  @Input() title: string = ''
  @Input() data: number [] = [ 350, 450, 100 ];
  @Input() labels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];

  public colors: Color[] = [ '#6857E6', '#009FEE', '#F02059']
  // Doughnut
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        { data: this.data, backgroundColor: this.colors }
      ]
    };
  }
}
