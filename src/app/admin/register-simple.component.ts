import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-simple',
  templateUrl: './register-simple.component.html'
})
export class RegisterSimpleComponent implements OnInit {
  value : any;
  constructor() { }

  ngOnInit() {
  }

  handle(form : any) : void {
    console.log(form);
  }
}
