import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CategoryGridComponent} from "./category-grid.component";
import {CategoryCardComponent} from "./category-card.component";
import {CategorySlideComponent} from "./category-slide.component";
import {CategoryListComponent} from './category-list.component';
import {CategoryService} from './category.service';
import { CategoryTitlePipe } from './category-title.pipe';
import { CategoryFormComponent } from './category-form.component'
import {SharedModule} from "../shared/shared.module";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports : [CommonModule,RouterModule,FormsModule,ReactiveFormsModule,SharedModule],
  declarations : [CategoryGridComponent,CategoryListComponent,CategoryCardComponent,CategorySlideComponent, CategoryTitlePipe, CategoryFormComponent],
  exports : [CategoryFormComponent,CategoryGridComponent,CategoryListComponent,CategoryCardComponent,CategorySlideComponent, CategoryTitlePipe],
  providers : [CategoryService]
})
export class CategoryModule {}
