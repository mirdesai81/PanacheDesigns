import {Component,Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from './product.service';
@Component({
  selector : 'app-product-card',
  templateUrl : './product-card.component.html'
})
export class ProductCardComponent {
  @Input() products : Product[];
  constructor(private router : Router) {

  }

  setClasses(product : Product) {
    return {
      "card-danger" : product.isSpecial,
      "card-inverse" : product.isSpecial
    };
  }

  buy(product : Product) {
    console.log("We bought",product.title);
  }
}
