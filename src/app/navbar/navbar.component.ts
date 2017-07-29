import { Component, OnInit } from '@angular/core';
import {INavItem,NavItems} from "./NavItem";
import {User} from '../login/User';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName : string = "Panache Designs";
  navItems : INavItem[] = new NavItems().navs;
  loginInline : boolean = true;
  constructor() { }

  ngOnInit() {
  }


}
