import {Component,Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product,getProducts} from './product';
@Component({
  selector : 'app-product-grid',
  templateUrl : './product-grid.component.html'
})
export class ProductGridComponent {
  products : any = [];
  constructor() {
    let index = 0; let products: Product[] = getProducts();
    let length = products.length; this.products = [];
    while (length) {
      let row:Product[] = [];
      if (length >= 3) {
        for (let i = 0; i < 3; i++) {
          row.push(products[index++]);
        }
        this.products.push(row);
        length -= 3;
      } else {
        for (; length > 0; length--) {
          row.push(products[index++]);
        }
        this.products.push(row);
      }
    }
  }
}
