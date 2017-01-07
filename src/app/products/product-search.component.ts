import {Component,} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from './product';
@Component({
  selector : 'app-product-search',
  templateUrl : './product-search.component.html'
})
export class ProductSearchComponent {
  constructor(private router : Router) {

  }

  searchProduct(value : String) {
    this.router.navigate(['/products'],{queryParams : { search : value}});
  }
}
