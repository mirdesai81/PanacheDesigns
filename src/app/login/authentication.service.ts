import {Injectable} from '@angular/core';
import {Http,Headers,Response,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './User';
import {JwtHelper} from 'angular2-jwt';
import {appConfig} from '../app.config';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class AuthenticationService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  jwtHelper : JwtHelper = new JwtHelper();
  currentUser : User = null;

  constructor(private http: AuthHttp) {

  }

  login(user : User) {
    return this.http.post(appConfig.apiUrl + '/api/login',{userName : user.userName, password : user.password},this.options)
      .map((response : Response) => {
        let user = response.json();
        if(user && user.token) {
          localStorage.setItem('currentUser',user.token);
          this.currentUser = this.decodeUserFromToken(user.token).user;
          console.log(this.currentUser);
        }

        return this.currentUser;
      });
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  isTokenExpired(token) {
    return this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  loggedInUser()  {
    let token = localStorage.getItem('currentUser');

    if(token && !this.isTokenExpired(token)) {
      this.currentUser = this.decodeUserFromToken(token).user;
    } else {
      this.login();
    }

    return this.currentUser;
  }
}
