import { Component, OnInit } from '@angular/core';
import {Cart} from "./cart.service";
import {CartService} from "./cart.service";

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styles: []
})
export class CartMenuComponent implements OnInit {

  cart : Cart;
  constructor(private cartService : CartService) {
    this.cart = this.cartService.cart;
  }


  ngOnInit() {
  }

}
