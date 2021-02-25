import { Component, Input,Output,OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  @Input('type') doughnutChartType: ChartType = 'doughnut';

  public colors:Color[]=[
    {backgroundColor:['9E120E','#FF5800','#FFB414']}
  ]

  @Input() titulo:string='Sin titulo'
  // @Input() labels:string[]=['Sin labels', 'Sin labels', 'Sin labels'];
  // @Input() data:MultiDataSet=this.doughnutChartData

  constructor() { }

  ngOnInit(): void {
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
