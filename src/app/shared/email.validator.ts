import {NG_VALIDATORS,FormControl,Validators} from '@angular/forms'
import {Directive,forwardRef} from '@angular/core';

export function validateEmail(c:FormControl) {
  let EMAIL_REGEXP : RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'i');

  return EMAIL_REGEXP.test(c.value) ? null : { validateEmail : { valid : false } }
}

@Directive({
  selector : '[validateEmail][ngModel],[validateEmail][formControl],[validateEmail][formControlName]',
  providers : [{ provide : NG_VALIDATORS , useExisting : forwardRef(() => EmailValidator),multi : true}]
})
export class EmailValidator {
   validator : Function = validateEmail;
   validate(c:FormControl) {
     return this.validator(c);
   }
}


