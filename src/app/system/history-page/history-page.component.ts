import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import * as moment from 'moment';

import { CategoriesService } from './../shared/services/categories.service';
import { EventsService } from './../shared/services/events.service';
import { Category } from './../shared/models/category.model';
import { HMEvent } from './../shared/models/event.model';

@Component({
  selector: 'pai-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;

  categories: Category[] = [];
  events: HMEvent[] = [];
  filteredEvents: HMEvent[] = [];

  chartData = [];

  isFilterVisible = false;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    this.isLoaded = false;
    Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).takeUntil(componentDestroyed(this))
      .subscribe((data: [Category[], HMEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
      });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach(category => {
      const catEvents = this.filteredEvents.filter(e => e.category === category.id && e.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(direction: boolean) {
    this.isFilterVisible = direction;
  }

  onOpenFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter(e => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter(e => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter(e => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }
}
