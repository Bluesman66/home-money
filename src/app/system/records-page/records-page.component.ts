import { Component, OnInit, OnDestroy } from '@angular/core';

import { Category } from './../shared/models/category.model';
import { CategoriesService } from './../shared/services/categories.service';
import { componentDestroyed } from "ng2-rx-componentdestroyed";

@Component({
  selector: 'pai-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void { }

  categories: Category[] = [];
  isLoaded: boolean = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.categoriesService.getCategories()
      .takeUntil(componentDestroyed(this))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      })
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const index = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[index] = category;  
  }
}