import { Component, OnInit } from '@angular/core';
import {Category,CategoryService} from './category.service';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationsService,SimpleNotificationsComponent} from "angular2-notifications";
import {FormSubscription} from "../helpers/form-subscription";
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styles: []
})
export class CategoryFormComponent implements OnInit {
  category : Category;
  categoryForm : FormGroup;
  formSubscribe : FormSubscription;
  categories : Category[];

  public active = true;
  validationMessages = {
    'title' : {
      'required' : 'Category Name is required.',
      'minlength' : 'Category Mame must be at least 5 characters long.'
    },
    'desc' : {
      'required' : 'Category Description is required.',
      'minlength' : 'Category Description must be at least 10 characters long.'
    }
  };

  formErrors = {
    'title' : '',
    'desc' : ''
  };


  constructor(private categoryService : CategoryService,
              private router : Router,
              private _fb : FormBuilder,private notificationsService : NotificationsService) { }

  ngOnInit() {
    this.categoryForm = this._fb.group({
      title : ['',[Validators.required,Validators.minLength(5)]],
      desc : ['',[Validators.required,Validators.minLength(10)]],
      parent : ['']
    });

    this.formSubscribe = new FormSubscription(this.validationMessages,this.formErrors,this.categoryForm);

    var form = this.categoryForm.valueChanges;
    form.subscribe(data => this.formSubscribe.subscribeToFormChanges(data));
    this.formSubscribe.subscribeToFormChanges();

    this.loadCategories();
  }

  save(e) {
    this.category = this.categoryForm.value;
    this.categoryService.create(this.category).subscribe(
      data => {
        this.notificationsService.success('Category',`Category ${this.category.title} Added Successfully`);
        this.category = null;
        this.loadCategories();
        this.categoryForm.reset();
      },
      error => {
        this.notificationsService.error('Category',`Category ${this.category.title} cannot be added`);
      });
    if(e) {
      e.preventDefault();
    }
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe( data => {this.categories = data}, error => {});
  }
}
