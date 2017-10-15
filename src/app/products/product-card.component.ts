import {Component,Input,Output,EventEmitter} from '@angular/core';
import {Router,} from '@angular/router';
import {Product} from './product.service';
import {Image} from "../shared/image";

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
      "rgba-red-strong" : product.onSale,
      "rgba-blue-strong" : !product.onSale
    };
  }

  displayImage(product : Product) {
    let displayOrder : number = 0;
    let displayImage : Image = null;
    product.images.forEach(image => {
      if(displayOrder == 0) {
        displayOrder = image.displayOrder;

      }

      if(image.displayOrder <= displayOrder) {
        displayImage = image;
      }

    });

    return displayImage.url;
  }


  buy(product : Product) {
    console.log("We bought",product.title);
    this.addToCart.emit(product);
  }
}
