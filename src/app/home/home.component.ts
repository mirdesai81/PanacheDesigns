import { Component,Input } from '@angular/core';
import {Category} from "../category/category";
import {getCategories} from "../category/category";
import {getCategory} from "../category/category";

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'Dream Bean';

  /*@Input() category : Category;*/

  // Slide Categories
  slideCategories: Category[] = [getCategory('1'), getCategory('2'), getCategory('3')];

  // Card categories
  cardCategories: Category[] = getCategories();

  selectCategory(category: Category) {
    console.log('Selected category', category.title);
  }
}
