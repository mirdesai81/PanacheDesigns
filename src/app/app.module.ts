import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {LocationStrategy,HashLocationStrategy,PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {CategoryModule} from './category/category.module';
import {ProductModule} from './products/product.module';
import {routing} from "./app.routes";
import {HomeComponent} from './home/home.component';
import {CartModule} from './cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CategoryModule,
    ProductModule,
    CartModule
  ],
  providers: [{provide : LocationStrategy, useClass : PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
