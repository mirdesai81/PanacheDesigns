import {Component,Input} from '@angular/core'
import {Category,CategoryService} from './category.service'
@Component({
  selector : 'app-category-grid',
  templateUrl : './category-grid.component.html'
})
export class CategoryGridComponent {
  categories : any = [];

  constructor(private categoryService : CategoryService) {
    let categories : Category[] = this.categoryService.getCategories();
    this.categories = this.transform(categories);

  }

  transform(source : Category[]) : Category[] {
    let index = 0;
    let length = source.length;
    let categories  = [];
    while (length) {
      let row:Category[] = [];
      if (length >= 3) {
        for (let i = 0; i < 3; i++) {
          row.push(source[index++]);
        }
        categories.push(row);
        length -= 3;
      } else {
        for (; length > 0; length--) {
          row.push(source[index++]);
        }
        categories.push(row);
      }
    }

    return categories;
  }

  selectCategory(category: Category) {
    console.log('Selected category', category.title);
  }
}
