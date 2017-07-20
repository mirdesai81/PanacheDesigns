import { Component } from '@angular/core';
import {SimpleNotificationsComponent} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'Groceries to Buy';

  public options = {
    position: ["bottom", "right"],
    timeOut: 1500,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    theClass : "notifications"
  };
}
