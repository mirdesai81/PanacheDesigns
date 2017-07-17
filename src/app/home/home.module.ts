import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';
import {CategoryModule} from "../category/category.module";
import {NavbarModule} from "../navbar/navbar.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,RouterModule,CategoryModule,SharedModule
  ],
  declarations: [HomeComponent],
  exports : [HomeComponent]
})
export class HomeModule { }
