import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';

import { BillService } from './../shared/services/bill.service';
import { CategoriesService } from './../shared/services/categories.service';
import { EventsService } from './../shared/services/events.service';
import { Bill } from './../shared/models/bill.model';
import { Category } from './../shared/models/category.model';
import { HMEvent } from './../shared/models/event.model';

@Component({
  selector: 'pai-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: HMEvent[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    this.isLoaded = false;
    Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).takeUntil(componentDestroyed(this))
      .subscribe((data: [Bill, Category[], HMEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoaded = true;
      });
  }

  getCategoryCost(category: Category): number {
    const catEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(category: Category): number {
    const percent = 100 * this.getCategoryCost(category) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }
}
