export interface INavItem {
  href : string;
  label : string;
  active:boolean;
  icon? : string;
}

export class NavItems {
  navs : INavItem[];
  constructor() {
    this.navs = [
      { href : '/welcome',label : 'Home', active : true},
      { href : '/products',label : 'Products', active : false},
      { href : '/checkout',label : 'Checkout', active : false},
      { href : '/signout',label : 'Sign out', active : false},
      { href : '/register',label : 'Register', active : false}
    ];

  }

}



