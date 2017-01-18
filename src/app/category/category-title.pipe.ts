import { Pipe, PipeTransform } from '@angular/core';
import {CategoryService} from "./category.service";
import {Category} from "./category.service";

@Pipe({
  name: 'categoryTitle'
})
export class CategoryTitlePipe implements PipeTransform {
  constructor(private categoryService : CategoryService) {

  }

  transform(value: string): string {
    let category : Category = this.categoryService.getCategory(value);
    return category ? category.title : '';
  }

}
