import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import {User} from "./User";
import {validatePhone} from '../shared/phone.validator';
import {validateZip} from "../shared/zip.validator";
import {validateEmail} from "../shared/email.validator";
import {UserService} from "./user.service";
import {Router} from '@angular/router';
import {NotificationsService,SimpleNotificationsComponent} from "angular2-notifications";
@Component({
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  public registerForm : FormGroup;
  public events : any = [];
  public submitted = false;
  public user : User;

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: true,
  };

  /*public formErrors;
   public validationMessages;*/
  constructor(private _fb : FormBuilder, private userService : UserService,
              private router : Router,private _notificationsService : NotificationsService) { }

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

  register(form : User) {
    this.submitted = true;
    this.user = this.registerForm.value;
    this.userService.create(this.user)
      .subscribe(
        data => {
          /*this.alertService.success('Registration successful', true);*/
          this._notificationsService.success(
            'Registration',
            'User Registration Successful',
            {
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            }
          );
          this.router.navigate(['/login']);
        },
        error => {
          /*this.alertService.error(error);*/
          this._notificationsService.error(
            'Registration',
            'User Registration Un-successful'
          );
          this.submitted = false;
        });
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
