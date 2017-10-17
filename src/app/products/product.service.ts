import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/observable/throw';
import 'rxjs/observable/from';
import {Observable} from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';
import {Image} from '../shared/image';
import {appConfig} from "../app.config";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Http, Headers, RequestOptions, Request, Response} from '@angular/http';
export interface Variation {
  name : string;
  id : number;
  values : string[];
}

export interface Option {
  name : string;
  values : string[];
}

//TODO add displayOrder. type = dropdown , textbox, radio , checkbox, colorsquare, imagesquare
export interface Attributes {
  attributeId : number;
  attributeName : string;
  attributeType : string;
  attributeTypeId : number;
  values : string[];
  displayOrder : number;
}

// TODO add displayOrder , showOnProduct page, allow filtering
export interface Specifications {
  attributeType : string;
  attributeName : string;
  attributeValue : string;
  showOnProductPage : boolean;
  displayOrder : number;
}

export interface Product {
  _id : string;
  productId : number;
  title : string;
  shortDescription : string;
  fullDescription : string;
  price : number;
  onSale : boolean;
  tags : string[];
  showOnHomePage : boolean;
  markAsNew : boolean; // display under new products
  ratings : number;
  allowReviews : boolean;
  totalReviews : number;
  sku : string;
  stockQuantity : number;
  displayStockAvailability : boolean;
  displayStockQuantity : boolean;
  notifyQuantityBelow : boolean;
  displayOrder : number;
  published : boolean;
  relatedProducts : Product[];
  attributes : Attributes[];
  variations : Variation[];
  specifications : Specifications[];
  categories : string[];
  slug : string;
  images : Image[];
}

class ProductNotFoundException extends Error {
  constructor(message? : string) {
    super(message);
  }
}


@Injectable()
export class ProductService {
  constructor(private http : AuthHttp) {

  }

  variations : Variation[] = [
    {
      name : "Size",
      id : 1,
      values : ["3 US/Canada","3.5 US/Canada","4 US/Canada",
        "4.5 US/Canada","5 US/Canada","5.5 US/Canada","6 US/Canada","6.5 US/Canada",
        "7 US/Canada","7.5 US/Canada","8 US/Canada","8.5 US/Canada","9 US/Canada","10 US/Canada",
        "10.5 US/Canada","11 US/Canada","11.5 US/Canada","12 US/Canada"]
    },
    {
      name : "Color",
      id : 3,
      values : []
    },

  ];

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  handleError(error : any){
    return Observable.throw(error.json().error || "Server Error");
  }

  getProducts(category? : string, search? : string) : Observable<Product[]> {
    var url = `${appConfig.apiUrl}/api/products/search`;

    if(category) {
      url = url + '?type=category&path=' + category;
    } else if (search) {
      url = url + '?type=title&path=' + search;
    }

    /*url = `${appConfig.apiUrl}/api/products`;*/

    return this.http.get(url)
      .map((response : Response) => {  return response.json();})
      .catch(this.handleError);

  }

  getProduct(id : string) : Observable<Product> {
    return this.http.get(appConfig.apiUrl + '/api/product/' + id)
      .map((response : Response) => {  return response.json();})
      .catch(this.handleError);
  }


  create(product : Product) {
    return this.http.post(appConfig.apiUrl + '/api/product',JSON.stringify(product),this.options);
  }

  update(product : Product) {
    return this.http.put(appConfig.apiUrl +'/api/product/' + product.slug,product);
  }

  delete(slug : string) {
    return this.http.delete(appConfig.apiUrl +'/api/product/' + slug);
  }

  deleteImage(filename:string) {
    return this.http.delete(appConfig.apiUrl +'/api/product/file/'+filename);
  }

  getVariations() : Observable<Variation[]> {
    return Rx.Observable.of(this.variations);
  }
}


