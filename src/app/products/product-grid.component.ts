import {Component,Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Product,ProductService} from './product.service';
import {CartService} from "../cart/cart.service";
@Component({
  selector : 'app-product-grid',
  templateUrl : './product-grid.component.html'
})
export class ProductGridComponent {
  products : any = [];
  constructor(private route : ActivatedRoute,private productService : ProductService,private cartService : CartService) {

    this.route.queryParams.subscribe(params => {
      let category : string = params['category'];
      let search : string = params['search'];
      console.log("Category : "+category+" , Search : "+search);
      this.productService.getProducts(category,search).subscribe( data => {this.products = this.transform(data)} , error => {console.log(error)});
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

  addProductToCart(product : Product) {
    this.cartService.addProduct(product);
  }
}


