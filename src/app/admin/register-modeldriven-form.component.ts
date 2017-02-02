import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import {User} from "./User";
import {validatePhone} from '../shared/phone.validator';
import {validateZip} from "../shared/zip.validator";
import {validateEmail} from "../shared/email.validator";
@Component({
  selector: 'app-register-modeldriven-form',
  templateUrl: './register-modeldriven-form.component.html',
  styles: []
})
export class RegisterModelDrivenFormComponent implements OnInit {
  public registerForm : FormGroup;
  public events : any = [];
  public submitted = false;
  public user : User;
  /*public formErrors;
  public validationMessages;*/
  constructor(private _fb : FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() : void {
    this.registerForm = this._fb.group({
      userName : ['',[Validators.required,Validators.minLength(5)]],
      password : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
      email : ['',[Validators.required,Validators.minLength(6),validateEmail]],
      firstName : [''],
      lastName : [''],
      gender : [''],
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



    var form = this.registerForm.valueChanges;
    form.subscribe(data => this.subscribeToFormChanges(data));

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(data? : any) {
    /*const formValueChanges = this.registerForm.valueChanges;
     const formStatusChanges = this.registerForm.statusChanges;
     formValueChanges.subscribe(x => this.events.push({event : 'VALUE_CHANGED',object : x}));
     formStatusChanges.subscribe(x => this.events.push({event : 'STATUS_CHANGED',object : x}));*/

    if(!this.registerForm) { return;}
    const form = this.registerForm;
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



  public active = true;

  handleSubmit(form : User) {
    this.submitted = true;
    this.user = this.registerForm.value;
    console.log(this.user);
  }

  validationMessages = {
  'userName' : {
    'required' : 'User Name is required.',
    'minlength' : 'User Name must be at least 5 characters long.'
  },
  'password' : {
    'required' : 'Password is required.',
    'minlength' : 'Password must be at least 5 characters long.',
    'maxlength' : 'Password cannot be more than 25 characters long.'
  },
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
  'userName' : '',
  'password' : '',
  'email' : '',
  'phone' : '',
  'zip' : ''
  };

}
