import {Component} from "@angular/core"
import {INavItem,NavItems} from "./NavItem";
@Component({
  selector : 'app-footer',
  templateUrl : './footer.component.html'
})
export class FooterComponent {
  navItems : INavItem[] = new NavItems().navs;
  constructor() {

  }

}
