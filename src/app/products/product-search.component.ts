import {Component,} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from './product.service';
@Component({
  selector : 'app-product-search',
  templateUrl : './product-search.component.html'
})
export class ProductSearchComponent {
  disabled : boolean = true;


  constructor(private router : Router) {

  }

  searchChanged(event : KeyboardEvent) {
    let element:HTMLInputElement = <HTMLInputElement>event.target;

    if(element.value) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

  }

  searchProduct(value : String) {
    console.log("Searched Product ",value);
    this.router.navigate(['/products'],{queryParams : { search : value}});
  }
}
