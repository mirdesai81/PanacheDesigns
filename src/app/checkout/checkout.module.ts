import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { CheckoutViewComponent } from './checkout-view.component';
import {RouterModule} from '@angular/router';
import {NavbarModule} from "../navbar/navbar.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,RouterModule,SharedModule
  ],
  declarations: [CheckoutViewComponent],
  exports : [CheckoutViewComponent]
})
export class CheckoutModule { }
