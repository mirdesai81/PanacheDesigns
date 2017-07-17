import { Component, OnInit } from '@angular/core';
import {INavItem,NavItems} from "./NavItem";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName : string = "Dream Bean";
  navItems : INavItem[] = new NavItems().navs;
  constructor() { }

  ngOnInit() {
  }

}
