import {Component,Input,Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router'
import {Category} from './category.service';
import {Image} from '../shared/image';
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

  displayImage(category : Category) {
    let displayOrder : number = 0;
    let displayImage : Image = null;
    category.images.forEach(image => {
      if(displayOrder == 0) {
        displayOrder = image.displayOrder;
      }

      if(image.displayOrder <= displayOrder) {
        displayImage = image;
      }

    });

    return displayImage.url;
  }

  filterCategory(category : Category) {
    this.router.navigate(['/products'],{queryParams : { category : category.slug}});
  }
}
