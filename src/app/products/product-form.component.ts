import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormArray,Validators} from '@angular/forms';
/*import {CategoryService} from '../category/category.module';*/
import {ProductService, Product} from "./product.service";
import {Router} from '@angular/router';
import {NotificationsService,SimpleNotificationsComponent} from "angular2-notifications";
import {FormSubscription} from "../helpers/form-subscription";
import {FormUpdate} from "../helpers/form-update";
import { Observable } from 'rxjs/Observable';
import {Image} from '../shared/image';
import {CategoryService,Category} from "../category/category.service";
import {Variation} from "./product.service";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: []
})
export class ProductFormComponent implements OnInit {
  @Input() category : string;
  @Input() variationValues : string;
  product : Product;
  productForm : FormGroup;
  formSubscribe : FormSubscription;
  model : string = 'product';
  public active = true;
  update : boolean = false;
  categories : Category[];
  displayType : string[] = ['Checkbox','Radio','Dropdown','Text'];
  variations : Variation[];
  variationForm : FormGroup;
  validationMessages = {
    'title' : {
      'required' : 'Product Name is required.',
      'minlength' : 'Product Name must be at least 5 characters long.'
    },
    'shortDescription' : {
      'required' : 'Product Description is required.',
      'minlength' : 'Product Description must be at least 20 characters long.'
    }
  };

  formErrors = {
    'title' : '',
    'shortDescription' : ''
  };

  variationValidationMessages = {
    name : 'Product variation name is required'
  };

  variationFormErrors = {
    name : ''
  };
  constructor(private productService : ProductService,
              private router : Router,
              private _fb : FormBuilder,private notificationsService : NotificationsService,private categoryService : CategoryService) { }

  ngOnInit() {
    this.productForm = this._fb.group({
      title : ['',[Validators.required,Validators.minLength(5)]],
      fullDescription : ['',[Validators.required,Validators.minLength(10)]],
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
      categories : this._fb.array([]),
      price : 0,
      salesPrice : 0,
      slug : ''
    });

    this.formSubscribe = new FormSubscription(this.validationMessages,this.formErrors,this.productForm);

    var form = this.productForm.valueChanges;
    form.subscribe(data => this.formSubscribe.subscribeToFormChanges(data));
    this.formSubscribe.subscribeToFormChanges();

    this.variationForm = this._fb.group({
      variation : this._fb.array([])
    });

    this.loadCategories();
    this.productService.getVariations().subscribe(data => { this.variations = data }, error => { console.log("Failed to load variations");})
  }

  addCategory() {
    const control = <FormArray>this.productForm.controls["categories"];
    control.push(this.initCategory());
  }

  initCategory() {
    console.log(this.category);

    return this._fb.control(this.category);
  }

  deleteCategory(i : number) {
    const control = <FormArray>this.productForm.controls["categories"];
    control.removeAt(i);
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe( data => {this.categories = data}, error => { console.log("failed to load categories");});
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


  addVariation(value : any) {
    const control = <FormArray> this.variationForm.controls["variation"];
    control.push(this.addVariationGroup(value));
  }

  addVariationGroup(value : any) {
    return this._fb.group({
      name : value,
      values : this._fb.array([])
    });
  }

  deleteVariation(index:number){
    const control = <FormArray> this.variationForm.controls["variation"];
    control.removeAt(index);
  }

  addVariationValue(index : number) {
    const control = <FormArray>(<FormArray>this.variationForm.controls["variation"]).at(index).get('values');
    control.push(this.initVariationValue());
  }

  initVariationValue() {
    return this._fb.control(this.variationValues);
  }

  deleteVariationValue(index1 : any,index2 : number){
    const control = <FormArray>(<FormArray>this.variationForm.controls["variation"]).at(index1).get('values');
    control.removeAt(index2);
  }

  saveVariations(data : any) {
    console.log(this.variationForm.value);
  }
}
