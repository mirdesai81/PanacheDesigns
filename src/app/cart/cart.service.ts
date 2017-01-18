import {Injectable} from  '@angular/core';
import {Product} from "../products/product.service";


export class Cart {
  amount : number = 0;
  count : number = 0;
  items : CartItem[] = [];
}

export interface CartItem {
  product : Product;
  amount : number;
  count : number;
}


@Injectable()
export class CartService {
  cart : Cart = new Cart();

  addProduct(product : Product) : CartItem {
    let item :  CartItem = this.findItem(product.id);

    if(item) {
      item.count++;
      item.amount = item.amount + product.price;
    } else {
      item = {
        product : product,
        count : 1,
        amount : product.price
      };

      this.cart.items.push(item);
    }
    this.cart.count++;
    this.cart.amount += product.price;
    /*console.log(product);
    console.log(this.cart);*/
    return item
  }

  removeProduct(product : Product) : CartItem {
    let item :  CartItem = this.findItem(product.id);

    if(item) {
      item.count--;
      if(!item.count) {
        this.remove(item);
      }

      this.cart.count--;
      this.cart.amount -= product.price;
    }

    return item;
  }

  removeItem(item : CartItem) {
    this.remove(item);
    this.cart.count -= item.count;
    this.cart.amount -= item.amount;
  }

  remove(item : CartItem) {
    let index : number = this.cart.items.indexOf(item);

    if(index !== -1) {
      this.cart.items.splice(index,1);
    }
  }

  findItem(id : String) : CartItem {
    if(this.cart && this.cart.items && this.cart.items.length > 0) {
      for(let i = 0; i < this.cart.items.length;i++) {
        if(this.cart.items[i].product.id === id) {
          return this.cart.items[i];
        }
      }
    }
    return null;
  }
}
