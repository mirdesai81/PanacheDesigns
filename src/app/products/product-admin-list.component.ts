import { Component, OnInit } from '@angular/core';
import {Product,ProductService} from "./product.service";

@Component({
  selector: 'app-product-admin-list',
  templateUrl: './product-admin-list.component.html',
  styles: []
})
export class ProductAdminListComponent implements OnInit {
  products : Product[];
  constructor(private productService : ProductService) {
   /* this.productService.getProducts().subscribe()*/
  }

  ngOnInit() {
  }

}
