import {Injectable} from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../login/authentication.service";

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router : Router,private authenticationService : AuthenticationService) {

  }

  canActivate(route : ActivatedRouteSnapshot,state:RouterStateSnapshot) {
    if(this.authenticationService.loggedInUser()) {
      return true;
    }

    // not logged in redirect to login page
    this.router.navigate(['/login'],{queryParams : { returnUrl : state.url}});
  }
}
