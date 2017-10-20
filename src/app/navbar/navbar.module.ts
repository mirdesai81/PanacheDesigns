import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { NavbarComponent } from './navbar.component';
import {RouterModule} from '@angular/router';
import {CartModule} from '../cart/cart.module';
import {FooterComponent} from "./footer.component";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationService} from '../login/authentication.service';

@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,RouterModule,SharedModule
  ],
  providers : [AuthenticationService]
})
export class NavbarModule { }
