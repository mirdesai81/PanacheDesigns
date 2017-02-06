import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { EmailValidator } from './email.validator';
import {ZipValidator} from './zip.validator';
import {PhoneValidator} from './phone.validator';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,RouterModule
  ],
  declarations: [EmailValidator,ZipValidator,PhoneValidator]
})
export class SharedModule { }
