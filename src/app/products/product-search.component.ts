import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from './product.service';
import {FormControl} from '@angular/forms'
@Component({
  selector : 'app-product-search',
  templateUrl : './product-search.component.html'
})
export class ProductSearchComponent implements OnInit {
  disabled : boolean = true;
  searchControl : FormControl;

  constructor(private router : Router) {

  }

  searchChanged(value : string) {
    if(value) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.subscribe((value : string) => {
      this.searchChanged(value);
    });
  }

  searchProduct(value : String) {
    console.log("Searched Product ",value);
    this.router.navigate(['/products'],{queryParams : { search : value}});
  }
}
