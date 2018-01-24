import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { componentDestroyed } from "ng2-rx-componentdestroyed";

import { CategoriesService } from './../../shared/services/categories.service';
import { Category } from './../../shared/models/category.model';

@Component({
  selector: 'pai-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void { }

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 1) capacity *= -1;

    const category = new Category(name, capacity);

    this.categoriesService.addCategory(category)
      .takeUntil(componentDestroyed(this))
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.onCategoryAdd.emit(category);
      });
  }
}
