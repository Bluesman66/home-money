import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';

import { Category } from './../../shared/models/category.model';
import { HMEvent } from './../../shared/models/event.model';
import { EventsService } from './../../shared/services/events.service';
import { BillService } from './../../shared/services/bill.service';
import { Bill } from './../../shared/models/bill.model';
import { Message } from './../../../shared/models/message.model';

@Component({
  selector: 'pai-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  message: Message;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {

    let { type, amount, category, description } = form.value;
    if (amount < 0) { amount *= -1; }

    const event = new HMEvent(
      type,
      amount,
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description);

    this.billService.getBill()
      .takeUntil(componentDestroyed(this))
      .subscribe((bill: Bill) => {
        let value: number;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.billService.updateBill({ value, currency: bill.currency })
          .mergeMap(() => this.eventsService.addEvent(event))
          .takeUntil(componentDestroyed(this))
          .subscribe(() => {
            form.setValue({
              type: 'outcome',
              description: ' ',
              amount: 0,
              category: 1
            });
          });
      });
  }
}
