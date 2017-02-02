import {FormControl} from '@angular/forms';
import {Directive,forwardRef} from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';

export function validateZip(c : FormControl) {
  let ZIP : RegExp = new RegExp(/^[1-9]\d{4}/,'i');

  return ZIP.test(c.value) ? null : {validateZip : { valid : false }};
}

@Directive({
  selector : '[validateZip][ngModel],[validateZip][formControl],[validateZip][formControlName]',
  providers : [{provide : NG_VALIDATORS,useExisting : forwardRef(() => ZipValidator),multi : true}]
})
export class ZipValidator {
  validator : Function = validateZip;

  validate(c: FormControl) {
    return this.validate(c);
  }
}
