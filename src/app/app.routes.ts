import {Router,Routes,RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductListComponent} from "./products/product-list.component"

const routes : Routes = [
  {path : '', redirectTo : 'welcome' , pathMatch : 'full'},
 {path : 'welcome', component : HomeComponent},
  {path: 'products', component : ProductListComponent}/*,
  {path : 'products/:id',component : ProductComponent}*/
];

export const routing = RouterModule.forRoot(routes);
