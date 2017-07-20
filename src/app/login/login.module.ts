import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {User} from './User';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AuthenticationService} from "./authentication.service";
import {RegisterComponent} from './register.component';
import {RouterModule} from '@angular/router';
import {UserService} from "./user.service";
import {SimpleNotificationsModule} from "angular2-notifications";
@NgModule({
  imports: [
    RouterModule,FormsModule,ReactiveFormsModule,CommonModule,SimpleNotificationsModule
  ],
  declarations: [RegisterComponent,LoginComponent],
  exports : [RegisterComponent,LoginComponent],
  providers : [AuthenticationService,UserService]
})
export class LoginModule { }
