import { Component, OnInit } from '@angular/core';
import {CartItem} from "../cart/cart.service";
import {Product} from "./product.service";
import {CartService} from "../cart/cart.service";
import {ActivatedRoute} from '@angular/router';
import {ProductService} from "./product.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styles: []
})
export class ProductViewComponent implements OnInit {
  product : Product;
  cartItem : CartItem;
  constructor(private route : ActivatedRoute,private productService : ProductService,private cartService : CartService) {
    this.route.params.subscribe(params => {
      let id : string = params['id'];
      this.productService.getProduct(id).subscribe(data => {this.product = data}, error => {
        console.log(error);
      });
      this.cartItem = this.cartService.findItem(id);
    });
  }

  get quantity():number {
    return this.cartItem ? this.cartItem.count : 0;
  }

  get amount() : number {
    return this.cartItem ? this.cartItem.amount : 0;
  }

  addToCart() {
    this.cartItem = this.cartService.addProduct(this.product);
  }

  removeFromCart() {
    this.cartItem = this.cartService.removeProduct(this.product);
  }

  isCartEmpty() {
    return (this.cartItem == null || this.cartItem.count == 0) ? true : false;
  }

  ngOnInit() {
  }

}
