import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common'
import {RegisterFormComponent} from './register-form.component';
import {RegisterSimpleComponent} from './register-simple.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterModelDrivenFormComponent } from './register-modeldriven-form.component';
@NgModule({
  declarations : [RegisterFormComponent,RegisterSimpleComponent, RegisterModelDrivenFormComponent],
  imports : [RouterModule,FormsModule,ReactiveFormsModule,CommonModule],
  exports : [RegisterFormComponent,RegisterSimpleComponent,RegisterModelDrivenFormComponent],
  providers : []
})
export class RegisterModule {}
