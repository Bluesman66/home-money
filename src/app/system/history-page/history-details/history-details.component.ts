import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { componentDestroyed } from "ng2-rx-componentdestroyed";

import { EventsService } from './../../shared/services/events.service';
import { CategoriesService } from './../../shared/services/categories.service';
import { HMEvent } from './../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'pai-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void { }

  event: HMEvent;
  category: Category;

  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.isLoaded = false;
    this.route.params
      .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
      .mergeMap((event: HMEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      })
      .takeUntil(componentDestroyed(this))
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }
}