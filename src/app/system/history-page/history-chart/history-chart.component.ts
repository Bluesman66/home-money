import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pai-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() { }
}
