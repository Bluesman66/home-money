import { Component, OnInit, Input } from '@angular/core';

import { Category } from './../../shared/models/category.model';
import { HMEvent } from './../../shared/models/event.model';

@Component({
  selector: 'pai-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: HMEvent[] = [];
  
  searchValue: string = '';
  searchPlaceHolder: string = 'Сумма';
  searchField:string = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach(e => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

  getEventClass(event: HMEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income' 
    };
  }

  changeCriteria(field: string){
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceHolder = namesMap[field];
    this.searchField = field;
  }
}
