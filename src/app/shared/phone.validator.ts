import {FormControl,AbstractControl,Validator} from '@angular/forms';
import {Directive,forwardRef} from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';

export function validatePhone(c:FormControl) {
  let PHONE_REG_XP : RegExp = new RegExp(/^\(?(\d{3})\)?[\s*.-]?(\d{3})[\s*.-]?(\d{4})/,'i');

  return PHONE_REG_XP.test(c.value) ? null : { validatePhone : { valid : false } };

}

@Directive({
  selector : '[validatePhone][ngModel],[validatePhone][formControl],[validatePhone][formControlName]',
  providers : [{provide : NG_VALIDATORS, useExisting : forwardRef(() => PhoneValidator),multi : true}]
})
export class PhoneValidator  {
  validator : Function = validatePhone;

  validate(c : AbstractControl) {
    return this.validator(c);
  }
}

