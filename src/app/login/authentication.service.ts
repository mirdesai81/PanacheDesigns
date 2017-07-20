import {Injectable} from '@angular/core';
import {Http,Headers,Response,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './User';
@Injectable()
export class AuthenticationService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) {

  }

  login(user : User) {
    return this.http.post('/api/login',{userName : user.userName, password : user.password},this.options)
      .map((response : Response) => {
        let user = response.json();
        console.log(user);
        if(user && user.token) {
          localStorage.setItem('currentUser',JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  loggedInUser()  {
    let user = localStorage.getItem('currentUser');
    if(user) {
      return JSON.parse(user);
    }

    return null;
  }
}
