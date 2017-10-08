import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions, Request, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/observable/throw';
import {Observable} from "rxjs/Observable";
import {AuthHttp} from 'angular2-jwt';
import {appConfig} from '../app.config';
import {Image} from '../shared/image';
export class Category {
  _id : string;
  categoryId : number;
  title : string;
  desc : string;
  path : string;
  images : Image[];
  parent : string = null;
  slug : string;
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
    return Observable.throw(error.json().error || "Server Error");
  }

  getCategories() : Observable<Category[]> {
    return this.http.get(appConfig.apiUrl + '/api/categories')
      .map((response : Response) => {return response.json();})
      .catch(this.handleError);
  }

  getCategoriesByPath() : Observable<Category[]> {
    return this.http.get(appConfig.apiUrl + '/api/categories?path=Home')
      .map((response : Response) => {return response.json();})
      .catch(this.handleError);
  }

  getCategory(id : string) : Observable<Category>{
    return this.http.get(appConfig.apiUrl + '/api/category/' + id)
      .map((response : Response) => {  return response.json();})
      .catch(this.handleError);
  }

  create(category : Category) {
    return this.http.post(appConfig.apiUrl + '/api/category',JSON.stringify(category),this.options);
  }

  update(category : Category) {
    return this.http.put(appConfig.apiUrl +'/api/category/' + category.slug,category);
  }

  delete(slug : string) {
    return this.http.delete(appConfig.apiUrl +'/api/category/' + slug);
  }

  deleteImage(filename:string) {
    return this.http.delete(appConfig.apiUrl +'/api/category/file/'+filename);
  }
}


