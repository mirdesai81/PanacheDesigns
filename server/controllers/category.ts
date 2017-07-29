import Category from "../models/category";
import BaseCtrl from "./base";
export default class CategoryCtrl extends BaseCtrl {
  model = Category;
  identityField = 'categoryId';

  // Get all
  getAll = (req, res) => {
    this.model.find({}).populate('parent ancestors children').exec((err,docs) => {
      if (err) { console.error(err); throw err; }
      console.log(docs);
      res.json(docs);
    });
  };

  insert = (req, res) => {
    var parent = req.body.parent || null;

    if(parent) {
      this.model.findOne({_id : parent}).then( category => {
        console.log(category);
        return category.addChild(req.body);
      }).then(child => {
        return res.status(200).json(child);
      }).catch(err => {
        if (err && err.code === 11000) {
          res.status(400).json({success : false, message : "Cannot insert duplicate key for category"});
        }
        if (err) {
          console.log(err);
          res.status(400).json({success : false, message : "Cannot insert category"});
        }
      });
    } else {
      const obj = new this.model(req.body);
      obj.save((err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          res.status(400).json({success : false, message : "Cannot insert duplicate key for category"});
        }
        if (err) {
          console.log(err);
          res.status(400).json({success : false, message : "Cannot insert category"});
        }
        res.status(200).json(item);
      });
    }
  };
}
