import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Category, CategoryService} from "./category.service";
import { Observable } from 'rxjs/Observable';
@Component({
  selector : 'app-category-list',
  templateUrl : './category-list.component.html'
})
export class CategoryListComponent {

  categories : Category[];

  constructor(private router : Router,private categoryService : CategoryService) {
    this.categoryService.getCategories().subscribe(data => {this.categories = data}, error => {});
  }

  filterProducts(category : Category) {
    this.router.navigate(['/products'],{queryParams : { category : category.slug}});
  }
}
