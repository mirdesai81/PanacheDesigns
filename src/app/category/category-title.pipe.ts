import { Pipe, PipeTransform } from '@angular/core';
import {CategoryService} from "./category.service";
import {Category} from "./category.service";
import { Observable } from 'rxjs/Observable';
@Pipe({
  name: 'categoryTitle'
})
export class CategoryTitlePipe implements PipeTransform {
  constructor(private categoryService : CategoryService) {

  }

  transform(value: string): string {
    let category : Category ;
    this.categoryService.getCategory(value).subscribe(data => {category = data} , error => {});
    return category ? category.title : '';
  }

}
