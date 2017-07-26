import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators} from '@angular/forms';
import {AuthenticationService} from './authentication.service';
import {Router,ActivatedRoute} from '@angular/router';
import {User} from "./User";
import {NotificationsService,SimpleNotificationsComponent} from "angular2-notifications";


@Component({
  selector : 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup;
  public user : User;
  public returnUrl : string;

  public loggedInUser : User;

  @Input()
  public inline : boolean = false;

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: true,
  };

  constructor(private _fb : FormBuilder,private route : ActivatedRoute,
              private router : Router, private authenticationService : AuthenticationService,
              private _notificationsService : NotificationsService) { }

  ngOnInit() {

    this.loginForm = this._fb.group({
      userName : ['',[Validators.required,Validators.minLength(5)]],
      password : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
    });

    var form = this.loginForm.valueChanges;
    form.subscribe(data => this.subscribeToFormChanges(data));

    this.subscribeToFormChanges();


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  subscribeToFormChanges(data? : any) {
    if(!this.loginForm) { return;}
    const form = this.loginForm;
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

  login(form : User) {
    this.user = this.loginForm.value;

    this.authenticationService.login(this.user)
      .subscribe(
        data => {

          if(data) {
            this.user = data;

            this._notificationsService.success(
              'Login',
              'Login Successful'
            );
            /*this.user = JSON.parse(data);*/
            this.router.navigate([this.returnUrl])
          } else {
            this._notificationsService.error(
              'Login',
              'Invalid username or password'
            );
            this.user = null;
          }
        },
        error => {
          this._notificationsService.error(
            'Login',
            'Invalid username or password'
          );
          this.user = null;
          console.log(error);
        }
      );

  }

  isLoggedIn()  {
   this.loggedInUser = this.authenticationService.loggedInUser();
    if(this.loggedInUser) {
      return true;
    }

    return false;
  }

  logout() {
    this.authenticationService.logout();

    this._notificationsService.success(
      'Sign Out',
      'Sign Out Successful'
    );

    this.router.navigate(['/login']);
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
    }
  };

  formErrors = {
    'userName' : '',
    'password' : ''
  };
}
