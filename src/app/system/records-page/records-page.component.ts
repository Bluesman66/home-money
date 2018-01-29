import { Component, OnInit, OnDestroy } from '@angular/core';

import { Category } from './../shared/models/category.model';
import { CategoriesService } from './../shared/services/categories.service';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'pai-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    this.isLoaded = false;
    this.categoriesService.getCategories()
      .takeUntil(componentDestroyed(this))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  onNewCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  onCategoryWasEdited(category: Category) {
    const index = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[index] = category;
  }
}
