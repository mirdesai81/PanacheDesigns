import Products from "../models/products";
import BaseCtrl from "./base";

class ProductsCtrl extends BaseCtrl {
  model = Products;
  identityField : string = 'slug';

  delete = (req, res) => {
    var query = {};
    query[this.identityField] = req.params.id;
    this.model.findOneAndRemove(query, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };
}

export default ProductsCtrl;
