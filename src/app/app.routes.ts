import {Router,Routes,RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductListComponent} from "./products/product-list.component"
import {ProductViewComponent} from "./products/product-view.component";

const routes : Routes = [
  {path : '', redirectTo : 'welcome' , pathMatch : 'full'},
 {path : 'welcome', component : HomeComponent},
  {path: 'products', component : ProductListComponent},
  {path : 'product/:id',component : ProductViewComponent}
];

export const routing = RouterModule.forRoot(routes);
