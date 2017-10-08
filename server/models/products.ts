import * as mongoose from 'mongoose';
import * as slugs from 'mongoose-url-slugs';
const autoIncrement = require('mongoose-sequence')(mongoose);

/*_id : number;
 title : string;
 shortDescription : string;
 fullDescription : string;
 price : number;
 onSale : boolean;
 tags : string[];
 showOnHomePage : boolean;
 markAsNew : boolean; // display under new products
 ratings : number;
 allowReviews : boolean;
 totalReviews : number;
 sku : number;
 stockQuantity : number;
 displayStockAvailability : boolean;
 displayStockQuantity : boolean;
 notifyQuantityBelow : boolean;
 displayOrder : number;
 published : boolean;
 relatedProducts : Product[];
 attributes : Attributes[];
 variations : Variation[];
 specifications : Specifications[];
 categories : string[];
 slug : string;*/

var variation  = new mongoose.Schema({
  name: String,
  values: [{value : {type : String}, price : {type : Number}, quantity : {type : Number} , visible : { type : Boolean}}],
});

const productSchema = new mongoose.Schema({
  productId : {type : Number},
  title : { type : String, trim : true},
  images : [{ url : { type : String, trim : true }, type : { type : String, trim : true}, width : String, height : String, displayOrder : Number}],
  shortDescription : String,
  fullDescription : String,
  price : {type : Number},
  onSale : Boolean,
  tags : [{type : String}],
  showOnHomePage : {type : Boolean, default : false},
  markAsNew : {type : Boolean, default : false},
  ratings : Number,
  allowReview : Boolean,
  totalReviews : Number,
  sku : String,
  stockQuantity : Number,
  displayStockAvailability : Boolean,
  displayStockQuantity : Boolean,
  notifyQuantityBelow : Boolean,
  displayOrder : Number,
  published : Boolean,
  relatedProducts : [{type : mongoose.Schema.Types.ObjectId , ref : 'Products'}],
  variations : [variation],
  categories : [{type : mongoose.Schema.Types.ObjectId , ref : 'Category'}],
  slug : String,
},{collection : 'Product'});


/*categorySchema.methods = {
  addChild : function(child) {
    var that = this;
    child.parent = this._id;
    child.ancestors = this.ancestors.concat([this._id]);
    return this.model('Category').create(child,function(err,children){

      if (err) {
        console.log(err);
        /!*res.status(400).json({success : false, message : "Cannot update the parent category"});*!/
      }
      console.log(children);
      that.children.push(children._id);
      that.save();
    });
  }
};*/

productSchema.plugin(autoIncrement,{ inc_field : 'productId'});
productSchema.plugin(slugs('title'));



productSchema.pre('save',function(next){
  var products = this;
  if(!products.images || products.images.length == 0) {
    var image = {
      url : 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=Category&w=1100&h=350',
      type : 'carousel',
      width : '1100px',
      height : '350px',
      displayOrder : 1
    };

    products.images.push(image);

    image = {
      url : 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=Category&w=270&h=150',
      type : 'card',
      width : '270px',
      height : '150px',
      displayOrder : 2
    };

    products.images.push(image);
  }

  next();
});

let Products = mongoose.model('Products', productSchema);
export default Products;

