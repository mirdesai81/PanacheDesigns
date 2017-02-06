import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { NavbarComponent } from './navbar.component';
import {RouterModule} from '@angular/router';
import {CartModule} from '../cart/cart.module';

@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,RouterModule,CartModule
  ],
  declarations: [NavbarComponent],
  exports : [NavbarComponent]
})
export class NavbarModule { }
