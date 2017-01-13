import { Component, OnInit } from '@angular/core';

export interface INavItem {
  href : string;
  label : string;
  active:boolean;
  icon? : string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName : string = "Dream Bean";
  navItems : INavItem[] = [
    { href : '/welcome',label : 'Home', active : true},
    { href : '/products',label : 'Products', active : false},
    { href : '/checkout',label : 'Checkout', active : false},
    { href : '/signout',label : 'Sign out', active : false},
  ];
  constructor() { }

  ngOnInit() {
  }

}
