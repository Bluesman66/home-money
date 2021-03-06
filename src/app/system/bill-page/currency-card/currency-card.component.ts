import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pai-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;
  currencies: string[] = ['EUR', 'USD'];

  constructor() { }

  ngOnInit() { }
}
