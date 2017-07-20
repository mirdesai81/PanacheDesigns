import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart/cart.service";
import {FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import {User} from "../login/User";
import {validatePhone} from '../shared/phone.validator';
import {validateZip} from "../shared/zip.validator";
import {validateEmail} from "../shared/email.validator";
import {Cart} from "../cart/cart.service";
@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styles: []
})
export class CheckoutViewComponent implements OnInit {
  checkoutForm : FormGroup;
  cart : Cart;
  constructor(private cartService : CartService, private _fb : FormBuilder) {
    this.cart = this.cartService.cart;
  }

  ngOnInit() {
    this.checkoutForm = this._fb.group({
      email : ['',[Validators.required,Validators.minLength(6),validateEmail]],
      firstName : [''],
      lastName : [''],
      phone : ['',validatePhone],
      contact : this._fb.group({
        address1 : [''],
        address2 : [''],
        city : [''],
        state : [''],
        zip : ['',validateZip],
        country : ['']
      })
    });



    var form = this.checkoutForm.valueChanges;
    form.subscribe(data => this.subscribeToFormChanges(data));

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(data? : any) {
    if(!this.checkoutForm) { return;}
    const form = this.checkoutForm;
    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const msg = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += msg[key] + '';
        }
      }
    }
  }


  validationMessages = {
    'email' : {
      'required' : 'Email is required.',
      'minlength' : 'Email must be at least 6 characters long.',
      'validateEmail' : 'Invalid email entered.'
    },
    'phone' : {
      'validatePhone' : 'Invalid phone number entered.'
    },
    'zip' : {
      'validateZip' : 'Invalid zip entered.'
    }
  };

  formErrors = {
    'email' : '',
    'phone' : '',
    'zip' : ''
  };

  submit() {
    console.log("Add to Order");
    this.cartService.clearCart();
  }
}
