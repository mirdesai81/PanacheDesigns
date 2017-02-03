import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {CartItem} from "./cart.service";
import {Cart} from "./cart.service";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styles: []
})
export class CartViewComponent implements OnInit {

  cart : Cart;
  constructor(private cartService : CartService) {
    this.cart = this.cartService.cart;
  }

  clearCart() {
    this.cartService.clearCart();
  }

  update(value,item : CartItem) {
    let itemCount = value - item.count;

    if(itemCount > 0) {
      for(let i = 0 ; i < itemCount; i++) {
        this.cartService.addProduct(item.product);
      }
    } else if (itemCount < 0) {
      for(let i = 0; i < -itemCount; i++) {
        this.cartService.removeProduct(item.product);
      }
    }

    return value;
  }
  ngOnInit() {
  }

}
