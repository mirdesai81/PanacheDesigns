import Products from "../models/products";
import BaseCtrl from "./base";

class ProductsCtrl extends BaseCtrl {
  model = Products;
  identityField : string = 'slug';


  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

  delete = (req, res) => {
    var query = {};
    query[this.identityField] = req.params.id;
    this.model.findOneAndRemove(query, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };

  search = (req,res) => {
    console.log("Product Search API called!!!");
    var type = req.query.type;
    if(type && type === 'category' && req.query.path.toLowerCase() !== 'home' ) {
      console.log("Product Search by category");
      this.model.find({ categories : req.query.path},(err,docs) => {
          if (err) { console.error(err); throw err; }
          console.log(docs);
          res.json(docs);
        });
    } else if(type && type === 'title') {
      console.log("Product Search by title");
      var query = new RegExp(`${req.query.path}`,'i');
      this.model.find({ title : query}, (err,docs) => {
        if (err) { console.error(err); throw err; }
        console.log(docs);
        res.json(docs);
      });
    } else {
      console.log("Product Search all");
      this.model.find({},(err,docs) => {
        if (err) { console.error(err); throw err; }
        console.log(docs);
        res.json(docs);
      });
    }
  }
}

export default ProductsCtrl;
