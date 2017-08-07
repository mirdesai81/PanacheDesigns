import {Injectable} from '@angular/core';
import {CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {CategoryFormComponent} from "../category/category-form.component";
import {Observable} from 'rxjs/Observable';
@Injectable()
export class CategoryDeactivateGuard implements CanDeactivate<CategoryFormComponent> {

  canDeactivate(component : CategoryFormComponent,route : ActivatedRouteSnapshot,state : RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log("CategoryDeactivateGuard called");
    return component.canDeactivate();

  }

}
