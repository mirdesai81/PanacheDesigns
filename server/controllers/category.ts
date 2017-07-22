import Category from "../models/category";
import BaseCtrl from "./base";
export default class CategoryCtrl extends BaseCtrl {
  model = Category;
  identityField = 'categoryId';
}
