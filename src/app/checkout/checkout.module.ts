import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { CheckoutViewComponent } from './checkout-view.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,RouterModule
  ],
  declarations: [CheckoutViewComponent],
  exports : [CheckoutViewComponent]
})
export class CheckoutModule { }
