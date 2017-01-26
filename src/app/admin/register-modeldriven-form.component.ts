import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import {User} from "./User";

@Component({
  selector: 'app-register-modeldriven-form',
  templateUrl: './register-modeldriven-form.component.html',
  styles: []
})
export class RegisterModelDrivenFormComponent implements OnInit {
  public registerForm : FormGroup;
  public events : any = [];

  constructor(private _fb : FormBuilder) { }

  ngOnInit() {
   /* this.registerForm = new FormGroup({
        userName : new FormControl(''),
        password : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
        email : new FormControl('',[Validators.required,Validators.minLength(6)]),
        firstName : new FormControl(''),
        lastName : new FormControl(''),
        gender : new FormControl(''),
        contact : new FormGroup({
          address1 : new FormControl(''),
          address2 : new FormControl(''),
          state : new FormControl(''),
          city : new FormControl(''),
          zip : new FormControl('')
        })
    });*/

    this.registerForm = this._fb.group({
      userName : ['',[Validators.required,Validators.minLength(5)]],
      password : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      email : ['',[Validators.required,Validators.minLength(6)]],
      firstName : [''],
      lastName : [''],
      gender : [''],
      contact : this._fb.group({
        address1 : [''],
        address2 : [''],
        city : [''],
        state : [''],
        zip : [''],
        country : ['']
      })
    });

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges() {
    const formValueChanges = this.registerForm.valueChanges;
    const formStatusChanges = this.registerForm.statusChanges;
    formValueChanges.subscribe(x => this.events.push({event : 'VALUE_CHANGED',object : x}));
    formStatusChanges.subscribe(x => this.events.push({event : 'STATUS_CHANGED',object : x}));
  }

  handleSubmit(form : User) {
    console.log(form);
  }

}
