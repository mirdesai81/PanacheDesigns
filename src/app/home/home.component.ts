import { Component,Input,OnInit } from '@angular/core';
import {Category,CategoryService} from "../category/category.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'Dream Bean';

  constructor(private categoryService : CategoryService) {

  }

  /*@Input() category : Category;*/

  // Slide Categories
  slideCategories: Category[] = [];

  // Card categories
  cardCategories: Category[];

  /*selectCategory(category: Category) {
    console.log('Selected category', category.title);
  }*/

  ngOnInit() {

    this.categoryService.getCategories()
      .subscribe(data => {
                    this.cardCategories = this.slideCategories = data;
                    /*let total = 0;
                    this.cardCategories.forEach(category =>
                    { if(total < 3) {
                        this.slideCategories.push(category);
                      }
                      total += 1;
                    });*/
                  });
  }
}
