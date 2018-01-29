import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';

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
        this.calculateChartData();
        this.isLoaded = true;
      });
  }

  private calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach(category => {
      const catEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
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
    console.log(filterData);
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
  }

}
