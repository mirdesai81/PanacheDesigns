import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {PhoneValidator} from "./shared/phone.validator";
import {ZipValidator} from "./shared/zip.validator";
import {EmailValidator} from "./shared/email.validator";
import {CheckoutModule} from './checkout/checkout.module';
import {NavbarModule} from "./navbar/navbar.module";
import {HomeModule} from "./home/home.module";
import {LoginModule} from './login/login.module';
import {LoggedInGuard} from "./guard/auth.guard";
import {SimpleNotificationsModule} from 'angular2-notifications';
import {customHttpProvider} from './helpers/custom-http';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    noTokenScheme : true,
    noJwtError : true,
    tokenName: 'currentUser'
  }), http, options);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    routing,
    NavbarModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CheckoutModule,
    HomeModule,
    LoginModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [{provide : LocationStrategy, useClass : PathLocationStrategy},{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
