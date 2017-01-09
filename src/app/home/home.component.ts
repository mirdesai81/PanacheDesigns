import { Component,Input } from '@angular/core';
import {Category,CategoryService} from "../category/category.service";


@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'Dream Bean';

  constructor(private categoryService : CategoryService) {

  }

  /*@Input() category : Category;*/

  // Slide Categories
  slideCategories: Category[] = [this.categoryService.getCategory('1'), this.categoryService.getCategory('2'), this.categoryService.getCategory('3')];

  // Card categories
  cardCategories: Category[] = this.categoryService.getCategories();

  selectCategory(category: Category) {
    console.log('Selected category', category.title);
  }
}
