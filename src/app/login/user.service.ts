import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Request, Response} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {User} from  './User';
import 'rxjs/add/operator/map';
import {appConfig} from '../app.config';
@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http : Http) {}

  getAll() {
    return this.http.get(appConfig.apiUrl + '/api/users').map((response : Response) => {response.json()});
  }

  getById(_id : string) {
    return this.http.get(appConfig.apiUrl + '/api/users/' + _id).map((response : Response) => {response.json()});
  }

  create(user : User) {
    return this.http.post(appConfig.apiUrl + '/api/user',JSON.stringify(user),this.options);
  }

  update(user : User) {
    return this.http.put(appConfig.apiUrl + '/api/user/' + user._id,user);
  }

  delete(_id : string) {
    return this.http.delete(appConfig.apiUrl + '/api/user/' + _id);
  }
}
