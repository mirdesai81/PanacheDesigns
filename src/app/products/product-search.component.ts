import {Component,} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from './product.service';
@Component({
  selector : 'app-product-search',
  templateUrl : './product-search.component.html'
})
export class ProductSearchComponent {
  constructor(private router : Router) {

  }

  searchProduct(value : String) {
    console.log("Searched Product ",value);
    this.router.navigate(['/products'],{queryParams : { search : value}});
  }
}
