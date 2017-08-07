import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { EmailValidator } from './email.validator';
import {ZipValidator} from './zip.validator';
import {PhoneValidator} from './phone.validator';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../navbar/footer.component';
import {CartMenuComponent} from '../cart/cart-menu.component';
import {CartService} from "../cart/cart.service";
import {LoginModule} from '../login/login.module';
import { FileUploadComponent } from './file-upload.component';
import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,RouterModule,LoginModule,FileUploadModule
  ],
  declarations: [EmailValidator,ZipValidator,PhoneValidator,NavbarComponent,FooterComponent,CartMenuComponent, FileUploadComponent],
  exports: [NavbarComponent,FooterComponent,CartMenuComponent,FileUploadComponent],
  providers : [CartService]
})
export class SharedModule { }
