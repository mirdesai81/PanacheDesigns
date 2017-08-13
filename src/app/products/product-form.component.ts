import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormArray,Validators} from '@angular/forms';
/*import {CategoryService} from '../category/category.module';*/
import {ProductService, Product} from "./product.service";
import {Router} from '@angular/router';
import {NotificationsService,SimpleNotificationsComponent} from "angular2-notifications";
import {FormSubscription} from "../helpers/form-subscription";
import {FormUpdate} from "../helpers/form-update";
import { Observable } from 'rxjs/Observable';
import {Image} from '../shared/image';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: []
})
export class ProductFormComponent implements OnInit {
  product : Product;
  productForm : FormGroup;
  formSubscribe : FormSubscription;
  model : string = 'product';
  public active = true;
  update : boolean = false;

  validationMessages = {
    'title' : {
      'required' : 'Product Name is required.',
      'minlength' : 'Product Name must be at least 5 characters long.'
    },
    'description' : {
      'required' : 'Product Description is required.',
      'minlength' : 'Product Description must be at least 20 characters long.'
    }
  };

  formErrors = {
    'title' : '',
    'description' : ''
  };


  constructor(private productService : ProductService,
              private router : Router,
              private _fb : FormBuilder,private notificationsService : NotificationsService) { }

  ngOnInit() {
    this.productForm = this._fb.group({
      title : ['',[Validators.required,Validators.minLength(5)]],
      description : ['',[Validators.required,Validators.minLength(10)]],
      tags : this._fb.array([]),
      showOnHomePage : false,
      markAsNew : false,
      allowReviews : true,
      sku : 0,
      stockQuantity : 0,
      displayStockAvailability : false,
      displayStockQuantity : true,
    notifyQuantityBelow : true,
    displayOrder : 0,
    published : false,
    relatedProducts : this._fb.array([]),
      attributes : this._fb.array([]),
    specifications : this._fb.array([]),
      shortDescription : '',
      categories : '',
      slug : ''
    });

    this.formSubscribe = new FormSubscription(this.validationMessages,this.formErrors,this.productForm);

    var form = this.productForm.valueChanges;
    form.subscribe(data => this.formSubscribe.subscribeToFormChanges(data));
    this.formSubscribe.subscribeToFormChanges();

    /*this.loadCategories();*/
  }

  initAttributes() {
    return this._fb.group({
      attributeName : ['',[Validators.required]],
      attributeType : ['',[Validators.required]],
      values : [this._fb.array([]),[Validators.required]],
      displayOrder : 0
    })
  }

  addAttributes() {
    const control = <FormArray>this.productForm.controls["attributes"];
    control.push(this.initAttributes());
  }

/*  initCategories() {
    return this._fb.group({
      id : ['',[Validators.required]]
    })
  }

  addCategories() {
    const control = <FormArray>this.productForm.controls["categories"];
    control.push(this.initCategories());
  }*/

  save(e) {
  /*  this.category = this.productForm.value;

    if(!this.category.parent) {
      delete this.category.parent;
    }

    if(!this.category.slug) {
      delete this.category.slug;
    }

    if(!this.update) {
      this.productService.create(this.category).subscribe(
        data => {
          this.notificationsService.success('Category',`Category ${this.category.title} added successfully`);
          this.reset();
        },
        error => {
          this.notificationsService.error('Category',`Category ${this.category.title} cannot be added`);
        });
    } else {
      console.log(this.category);
      this.categoryService.update(this.category).subscribe(
        data => {
          this.notificationsService.success('Category',`Category ${this.category.title} updated successfully`);
          this.reset();
        },
        error => {
          this.notificationsService.error('Category',`Category ${this.category.title} cannot be updated`);
        });
    }

    if(e) {
      e.preventDefault();
    }*/
  }

}
