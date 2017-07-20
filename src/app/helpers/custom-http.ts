import {Injectable} from '@angular/core';
import {XHRBackend, ConnectionBackend, Request, Response, Headers, RequestOptions, RequestOptionsArgs,Http} from  '@angular/http';
import {appConfig} from '../app.config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class CustomHttp extends Http {
  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
    super(_backend,_defaultOptions);
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(appConfig.apiUrl + url,this.addJwt(options)).catch(this.handleError);
  }
  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(appConfig.apiUrl + url,body,this.addJwt(options)).catch(this.handleError);
  }
  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(appConfig.apiUrl + url,body,this.addJwt(options)).catch(this.handleError);
  }
  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(appConfig.apiUrl + url,this.addJwt(options)).catch(this.handleError);
  }

  private addJwt(options? : RequestOptionsArgs) : RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser && currentUser.token) {
      options.headers.append('Authorization','Bearer' + currentUser.token);
    }

    return options;
  }

  private handleError(error : any) {
    if(error.status === 401) {
      window.location.href = '/login';
    }

    return Observable.throw(error._body);
  }
}

export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new CustomHttp(xhrBackend, requestOptions);
}

export let customHttpProvider = {
  provide: Http,
  useFactory: customHttpFactory,
  deps: [XHRBackend, RequestOptions]
};
