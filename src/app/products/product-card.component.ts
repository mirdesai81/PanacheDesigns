import {Component,Input,Output,EventEmitter} from '@angular/core';
import {Router,} from '@angular/router';
import {Product} from './product.service';

@Component({
  selector : 'app-product-card',
  templateUrl : './product-card.component.html'
})
export class ProductCardComponent {
  @Input() products : Product[];
  @Output() addToCart : EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private router : Router) {

  }

  setClasses(product : Product) {

    return {
      "rgba-red-light" : product.isSpecial,
      "rgba-blue-light" : !product.isSpecial
    };
  }

  buy(product : Product) {
    console.log("We bought",product.title);
    this.addToCart.emit(product);
  }
}
