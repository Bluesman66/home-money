import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Category } from './../../shared/models/category.model';

@Component({
  selector: 'pai-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() FilterCancel = new EventEmitter<any>();
  @Output() FilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    { type: 'd', label: 'День' },
    { type: 'w', label: 'Неделя' },
    { type: 'M', label: 'Месяц' }
  ];

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  constructor() { }

  ngOnInit() {
  }

  onCloseFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.FilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      if (this[field].indexOf(value) === -1) {
        this[field].push(value);
      } else {
        this[field] = this[field].filter(i => i !== value);
      }
    }
  }

  onChangeType({ checked, value }) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  onChangeCategoty({ checked, value }) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  onApplyFilter() {
    this.FilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
