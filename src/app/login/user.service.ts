import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Request, Response} from '@angular/http';
import {User} from  './User';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http : Http) {}

  getAll() {
    return this.http.get('/api/users').map((response : Response) => {response.json()});
  }

  getById(_id : string) {
    return this.http.get('/api/users/' + _id).map((response : Response) => {response.json()});
  }

  create(user : User) {
    return this.http.post('/api/user',JSON.stringify(user),this.options);
  }

  update(user : User) {
    return this.http.put('/api/user/' + user._id,user);
  }

  delete(_id : string) {
    return this.http.delete('/api/user/' + _id);
  }
}
