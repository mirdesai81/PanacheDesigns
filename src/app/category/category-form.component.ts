import { Component, OnInit, HostListener } from '@angular/core';
import {Category,CategoryService} from './category.service';
import {FormBuilder, FormControl, FormGroup,Validators,FormArray} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationsService,SimpleNotificationsComponent} from "angular2-notifications";
import {FormSubscription} from "../helpers/form-subscription";
import {FormUpdate} from "../helpers/form-update";
import { Observable } from 'rxjs/Observable';
import {Image} from '../shared/image';
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
  model : string = 'category';
  public active = true;
  update : boolean = false;
  uploads : Image[];

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
    this.buildForm();

    this.formSubscribe = new FormSubscription(this.validationMessages,this.formErrors,this.categoryForm);

    var form = this.categoryForm.valueChanges;
    form.subscribe(data => this.formSubscribe.subscribeToFormChanges(data));
    this.formSubscribe.subscribeToFormChanges();

    this.loadCategories();
  }

  buildForm() {
    this.categoryForm = this._fb.group({
      title : ['',[Validators.required,Validators.minLength(5)]],
      desc : ['',[Validators.required,Validators.minLength(10)]],
      parent : '',
      path : null,
      images : this._fb.array([]),
      slug : ''
    });
  }

  initImage(image : Image) {
    return this._fb.group({
      url : image.url,
      type : image.type,
      width : image.width,
      height : image.height,
      displayOrder : image.displayOrder
    })
  }

  addImages(image : Image) {
    const control = <FormArray>this.categoryForm.controls["images"];
    control.push(this.initImage(image));
    this.uploads = this.categoryForm.get("images").value;
  }


 /*  get images() {
   return this.categoryForm.get("images") as FormArray;
   }*/
  save(e) {
    this.category = this.categoryForm.value;

    if(!this.category.parent) {
      delete this.category.parent;
    } else {
      this.categories.forEach((category : Category) => {
        if(category._id === this.category.parent) {
          if(!category.parent){
            this.category.path = `,${category.title},`;
          } else {
            this.category.path = `${category.path},${category.title}`;
          }
        }
      });
    }

    if(!this.category.slug) {
      delete this.category.slug;
    }

    if(!this.update) {
      this.saveCategory();
    } else {
      this.updateCategory();
    }

    if(e) {
      e.preventDefault();
    }
  }

  private saveCategory(notify : boolean = true) {
    this.categoryService.create(this.category).subscribe(
      data => {
        this.notificationsService.success('Category',`Category ${this.category.title} added successfully`);
        this.reset();
      },
      error => {
        this.notificationsService.error('Category',`Category ${this.category.title} cannot be added`);
      });
  }

  private updateCategory(notify : boolean = true) {
    console.log(this.category);
    this.categoryService.update(this.category).subscribe(
      data => {
        if(notify){
          this.notificationsService.success('Category',`Category ${this.category.title} updated successfully`);
          this.reset();
        }

      },
      error => {
        if(notify)
          this.notificationsService.error('Category',`Category ${this.category.title} cannot be updated`);
      });
  }

  private reset() {
    this.category = null;
    this.loadCategories();
    this.buildForm();
    this.uploads = null;
  }

  setImage(data:any) {
    if(data) {
      const image : Image = new Image(data);
      this.addImages(image);
    }

    this.category = this.categoryForm.value;
  }

  edit(category : Category) {
    console.log(category);
    this.reset();
    this.update = true;
    let formUpdate = new FormUpdate(this._fb);
    category.images.forEach(image => this.addImages(image));
    formUpdate.initFormGroup(this.categoryForm,category);
    if(category.parent) {
      this.categoryForm.controls['parent'].patchValue(category.parent);
    }
    this.category = category;
    this.uploads = this.categoryForm.get("images").value;
  }

  cancel() {
    if(this.update) {
      this.edit(this.category);
    } else {
      this.update = false;
      let category : Category = this.categoryForm.value;
      this.category = null;
      this.categoryForm.reset();
      console.log(category);
      this.deleteImages(category);
    }
  }

  canDeactivate() : Promise<boolean> | boolean {
    if(!this.update) {
      this.category = this.categoryForm.value;
      console.log(this.category);
      this.deleteImages(this.category);
    }

    return true;
  }

  private isImageChanged(field : string) {
    console.log(`${field} : ${this.categoryForm.controls[field].touched}`);
    return this.categoryForm.controls[field].touched
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe( data => {this.categories = data}, error => {});
  }

  deleteCategory(category : Category) {
    this.deleteImages(category);
    this.categoryService.delete(category.slug).subscribe(
      data => {
        this.notificationsService.success('Category',`Category ${category.title} deleted successfully`);
        this.loadCategories();
      },
      error => {
        this.notificationsService.success('Category',`Category ${category.title} cannot be deleted.`);
      }
    );
  }

  private deleteImages(category) {
    if(category && category.images) {
      category.images.forEach( (data : Image) => {
        this.deleteImage(data.url,false,false);
      });
    }
  }

  public deleteImage(field : string,notify : boolean = false,updateCategory : boolean = true) : void {
    this.categoryService.deleteImage(field.substr(field.lastIndexOf('/') + 1))
      .subscribe(data => {
        if(notify) {
          this.notificationsService.success('Category','Image deleted successfully');
        }

        if(updateCategory) {
          let images : Image[];
          images = this.category.images.filter(image => {
            return image.url.indexOf(field) === -1;
          });

          this.category.images = images;
          this.updateCategory(false);
          this.edit(this.category);
        }
      },
      error => {
        if(notify){
          this.notificationsService.error('Category','Image cannot be deleted');
        }
      });
  }
}
