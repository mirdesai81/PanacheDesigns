export interface INavItem {
  href : string;
  label : string;
  active:boolean;
  icon? : string;
  navs? : INavItem[];
}

export class NavItems {
  navs : INavItem[];
  constructor() {
    this.navs = [
      { href : '/welcome',label : 'Home', active : true},
      { href : '/products',label : 'Products', active : false},
      { href : '/checkout',label : 'Checkout', active : false},
      { href : '/register',label : 'Register', active : false},
      {href : 'admin-menu' , label : 'Admin' , active : false, navs : [{ href : '/admin/category',label : 'Category', active : false},
        { href : '/admin/product',label : 'Product', active : false}]}
    ];

  }

}



