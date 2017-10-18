import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "./product.service";


@Pipe(
  {
    name : 'ProductStockQuantity'
  }
)
export class ProductStockQuantityPipe implements PipeTransform {
  constructor() {

  }

  transform(product: Product): number {
    let count : number = 0;

    if(product.variations) {
      product.variations.forEach(variation => {
        variation.values.forEach(value => {
          console.log(value);
          if(value.quantity !== 0)
            count += value.quantity;
        })
      })
    }

    if(count === 0)
      count = product.stockQuantity;

    return count;
  }

}
