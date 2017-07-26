import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions, Request, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/Observable/throw';
import {Observable} from "rxjs/Observable";
import {AuthHttp} from 'angular2-jwt';
import {appConfig} from '../app.config';
export class Category {
  categoryId : number;
  title : string;
  desc : string;
  imageL : string;
  imageS : string;
}

class CategoryNotFoundException extends Error {
  constructor(message? : string) {
    super(message);
  }
}

@Injectable()
export class CategoryService {

  constructor(private http : AuthHttp) {

  }

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  handleError(error : any){
    console.log(error);
    return Observable.throw(error.json().error || "Server Error");
  }

  getCategories() : Observable<Category[]> {
    return this.http.get(appConfig.apiUrl + '/api/categories')
      .map((response : Response) => {console.log(response); return response.json();})
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCategory(id : string) : Observable<Category>{
    return this.http.get(appConfig.apiUrl + '/api/category/' + id)
      .map((response : Response) => { console.log(response); return response.json();})
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  create(category : Category) {
    return this.http.post(appConfig.apiUrl + '/api/category',JSON.stringify(category),this.options);
  }

  update(category : Category) {
    return this.http.put('/api/category/' + category.categoryId,category);
  }

  delete(id : string) {
    return this.http.delete('/api/category/' + id);
  }

}


