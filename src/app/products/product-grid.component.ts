import {Component,Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Product,ProductService} from './product.service';
@Component({
  selector : 'app-product-grid',
  templateUrl : './product-grid.component.html'
})
export class ProductGridComponent {
  products : any = [];
  constructor(private route : ActivatedRoute,private productService : ProductService) {

    this.route.queryParams.subscribe(params => {
      let category : string = params['category'];
      let search : string = params['search'];
      let products : Product[] = this.productService.getProducts(category,search);
      console.log("Filtered Products - ",products);
      this.products = this.transform(products);
      console.log("Transformed Products - ",this.products);
    });


  }

  transform(source : Product[]) : Product[] {
    let index = 0;
    let length = source.length;
    let products  = [];
    while (length) {
      let row:Product[] = [];
      if (length >= 3) {
        for (let i = 0; i < 3; i++) {
          row.push(source[index++]);
        }
        products.push(row);
        length -= 3;
      } else {
        for (; length > 0; length--) {
          row.push(source[index++]);
        }
        products.push(row);
      }
    }

    return products;
  }
}


