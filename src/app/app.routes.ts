import {Router,Routes,RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductListComponent} from "./products/product-list.component"
import {ProductViewComponent} from "./products/product-view.component";
import {RegisterFormComponent} from "./admin/register-form.component";
import {CartViewComponent} from "./cart/cart-view.component";
import {CheckoutViewComponent} from "./checkout/checkout-view.component";

const routes : Routes = [
  {path : '', redirectTo : 'welcome' , pathMatch : 'full'},
 {path : 'welcome', component : HomeComponent},
  {path: 'products', component : ProductListComponent},
  {path : 'product/:id',component : ProductViewComponent},
  {path : 'register',component : RegisterFormComponent},
  {path : 'cart',component : CartViewComponent},
  {path : 'checkout',component : CheckoutViewComponent}
];

export const routing = RouterModule.forRoot(routes);
