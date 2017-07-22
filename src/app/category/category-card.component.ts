import {Component,Input,Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router'
import {Category} from './category.service';
@Component({
  selector : 'app-category-card',
  templateUrl : './category-card.component.html'
})
export class CategoryCardComponent {
 @Input() categories : Category[];
 @Input() currentCount : number;
 /*@Output() select : EventEmitter<Category> = new EventEmitter<Category>();*/

  constructor(private router : Router) {

  }

 /* browse() {
    this.select.emit(this.category);
  }*/

  filterCategory(category : Category) {
    this.router.navigate(['/products'],{queryParams : { category : category.categoryId}});
  }
}
