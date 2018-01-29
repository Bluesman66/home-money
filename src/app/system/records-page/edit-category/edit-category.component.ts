import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from './../../shared/models/category.model';
import { CategoriesService } from './../../shared/services/categories.service';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { Message } from './../../../shared/models/message.model';

@Component({
  selector: 'pai-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() CategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category)
      .takeUntil(componentDestroyed(this))
      .subscribe((c: Category) => {
        this.CategoryEdit.emit(c);
        this.message.text = 'Категория успешно отредактирована.';
        setTimeout(() => this.message.text = '', 5000);
      });
  }
}
