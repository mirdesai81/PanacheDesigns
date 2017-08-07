import {Router,Routes,RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductListComponent} from "./products/product-list.component"
import {ProductViewComponent} from "./products/product-view.component";
import {RegisterComponent} from "./login/register.component";
import {CartViewComponent} from "./cart/cart-view.component";
import {CheckoutViewComponent} from "./checkout/checkout-view.component";
import {LoginComponent} from "./login/login.component";
import {LoggedInGuard} from "./guard/auth.guard";
import {CategoryDeactivateGuard} from "./guard/category-deactivate.guard";
import {CategoryFormComponent} from "./category/category-form.component";

const routes : Routes = [
  {path : '', redirectTo : 'welcome' , pathMatch : 'full'},
 {path : 'welcome', component : HomeComponent},
  {path: 'products', component : ProductListComponent,canActivate : [LoggedInGuard]},
  {path : 'product/:id',component : ProductViewComponent,canActivate : [LoggedInGuard]},
  {path : 'category',component : CategoryFormComponent, canActivate : [LoggedInGuard], canDeactivate : [CategoryDeactivateGuard]},
  {path : 'register',component : RegisterComponent},
  {path : 'cart',component : CartViewComponent,canActivate : [LoggedInGuard]},
  {path : 'checkout',component : CheckoutViewComponent,canActivate : [LoggedInGuard]},
  {path : 'login', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
