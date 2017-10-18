import { Component, OnInit } from '@angular/core';
import {CartItem} from "../cart/cart.service";
import {Product} from "./product.service";
import {CartService} from "../cart/cart.service";
import {ActivatedRoute} from '@angular/router';
import {ProductService} from "./product.service";
import {Image} from "../shared/image";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styles: []
})
export class ProductViewComponent implements OnInit {
  product : Product;
  cartItem : CartItem;
  image : Image;
  available : boolean = false;
  price : number;
  constructor(private route : ActivatedRoute,private productService : ProductService,private cartService : CartService) {
    this.route.params.subscribe(params => {
      let id : string = params['id'];
      this.productService.getProduct(id).subscribe(data =>
      {
        this.product = data;
        this.image = this.product.images[0];
        this.available = true;
        this.setPrice(0);
      }, error => {
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

  displayImage(index : number) {
    this.image = this.product.images[index];
  }


  ngOnInit() {
  }

  setPrice(index : number) {
    this.product.variations.forEach(variation => {
      this.price = variation.values[index].price;
    });
  }
}
