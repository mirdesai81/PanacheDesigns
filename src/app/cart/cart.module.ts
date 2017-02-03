import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import {CartMenuComponent} from './cart-menu.component';
import {CartService} from './cart.service';
import { CartViewComponent } from './cart-view.component';

@NgModule({
  imports : [FormsModule,CommonModule,RouterModule],
  declarations : [CartMenuComponent, CartViewComponent],
  exports : [CartMenuComponent, CartViewComponent],
  providers : [CartService]
})
export class CartModule {}
