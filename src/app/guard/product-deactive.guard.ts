import {Injectable} from '@angular/core';
import {CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {ProductFormComponent} from "../products/product-form.component";
import {Observable} from 'rxjs/Observable';
@Injectable()
export class ProductDeactivateGuard implements CanDeactivate<ProductFormComponent> {

  canDeactivate(component : ProductFormComponent,route : ActivatedRouteSnapshot,state : RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log("ProductDeactivateGuard called");
    return component.canDeactivate();

  }

}
