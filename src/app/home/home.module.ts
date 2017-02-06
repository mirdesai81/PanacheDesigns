import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,RouterModule
  ],
  declarations: [HomeComponent],
  exports : [HomeComponent]
})
export class HomeModule { }
