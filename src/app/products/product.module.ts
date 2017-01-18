import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProductCardComponent} from "./product-card.component";
import {ProductGridComponent} from "./product-grid.component";
import {ProductListComponent} from './product-list.component';
import {ProductSearchComponent} from './product-search.component';
import {CategoryModule} from '../category/category.module';
import {ProductService} from './product.service';
import { ProductViewComponent } from './product-view.component';

@NgModule({
  imports : [CommonModule,RouterModule,CategoryModule],
  declarations : [ProductCardComponent,ProductGridComponent,ProductListComponent,ProductSearchComponent, ProductViewComponent],
  exports : [ProductCardComponent,ProductGridComponent,ProductListComponent,ProductSearchComponent, ProductViewComponent],
  providers : [ProductService]
})
export class ProductModule {}
