import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,NgForm,NgModel,NgModelGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {LocationStrategy,HashLocationStrategy,PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {CategoryModule} from './category/category.module';
import {ProductModule} from './products/product.module';
import {routing} from "./app.routes";
import {HomeModule} from './home/home.module';
import {CartModule} from './cart/cart.module';
import {RegisterModule} from './admin/register.module';
import {PhoneValidator} from "./shared/phone.validator";
import {ZipValidator} from "./shared/zip.validator";
import {EmailValidator} from "./shared/email.validator";
import {CheckoutModule} from './checkout/checkout.module';
import {NavbarModule} from "./navbar/navbar.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    NavbarModule,
    HomeModule,
    CategoryModule,
    ProductModule,
    CartModule,
    RegisterModule,
    CheckoutModule
  ],
  providers: [{provide : LocationStrategy, useClass : PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
