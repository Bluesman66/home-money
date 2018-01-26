import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { Category } from './../../shared/models/category.model';
import { HMEvent } from './../../shared/models/event.model';

@Component({
  selector: 'pai-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {    
    let { type, amount, category, description } = form.value;
    if (amount < 0) amount *= -1;

    const event = new HMEvent(
      type, 
      amount, 
      category, 
      moment().format('DD.MM.YYYY HH:mm:ss'), 
      description);
  }
}
