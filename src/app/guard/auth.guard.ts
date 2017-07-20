import {Injectable} from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router : Router) {

  }

  canActivate(route : ActivatedRouteSnapshot,state:RouterStateSnapshot) {
    if(localStorage.getItem('currentUser')) {
      return true;
    }

    // not logged in redirect to login page
    this.router.navigate(['/login'],{queryParams : { returnUrl : state.url}});
  }
}
