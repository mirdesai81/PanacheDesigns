import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import {CartMenuComponent} from './cart-menu.component';
import {CartService} from './cart.service';
import { CartViewComponent } from './cart-view.component';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../navbar/footer.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports : [FormsModule,CommonModule,RouterModule,SharedModule],
  declarations : [CartViewComponent],
  exports : [CartViewComponent]
})
export class CartModule {}
