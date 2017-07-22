import {FormGroup,FormControl} from '@angular/forms';

export class FormSubscription {
  public validationMessages : any;
  public formErrors : any;
  public formGroup : FormGroup;

  constructor(validationMessages : any, formErrors : any, formGroup : FormGroup) {
    this.validationMessages = validationMessages;
    this.formErrors = formErrors;
    this.formGroup = formGroup;
  }

  public subscribeToFormChanges(data? : any) {
    if(!this.formGroup) { return;}
    const form = this.formGroup;
    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const msg = this.validationMessages[field];
        /* console.log(control.errors);
         console.log(msg);*/
        for(const key in control.errors) {
          this.formErrors[field] += msg[key] + '';
        }
      }
    }
  }
}
