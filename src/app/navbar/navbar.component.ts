import { Component, OnInit } from '@angular/core';
import {INavItem,NavItems} from "./NavItem";
import {User} from '../login/User';
import {LoginComponent} from '../login/login.component';
import {AuthenticationService} from '../login/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName :  "Panache Designs";
  logo = {
    brand : "Panache",
    subBrand : "Designs"
  };
  navItems : INavItem[] = new NavItems().navs;
  loginInline : boolean = true;
  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
  }



  isAdmin() : boolean {
   return this.authService.isAdmin();

  }

}
