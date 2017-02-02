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
import {HomeComponent} from './home/home.component';
import {CartModule} from './cart/cart.module';
import {RegisterModule} from './admin/register.module';
import {PhoneValidator} from "./shared/phone.validator";
import {ZipValidator} from "./shared/zip.validator";
import {EmailValidator} from "./shared/email.validator";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ZipValidator,
    PhoneValidator,
    EmailValidator
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    CategoryModule,
    ProductModule,
    CartModule,
    RegisterModule
  ],
  providers: [{provide : LocationStrategy, useClass : PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
