import * as mongoose from 'mongoose';
import * as autoIncrement from 'mongoose-sequence';
import * as slugs from 'mongoose-url-slugs';

/*{id: '1', title: 'Bread & Bakery',
  imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
  imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
  desc: 'The best cupcakes, cookies, cakes, pies, cheesecakes, fresh bread, biscotti, muffins, bagels, fresh coffee and more.' }*/

const categorySchema = new mongoose.Schema({
  categoryId : {type : Number},
  title : { type : String, trim : true},
  images : [{ url : { type : String, trim : true }, type : { type : String, trim : true}, width : String, height : String, displayOrder : Number}],
  desc : String,
  path : {type : String, default : null},
  parent : {type : mongoose.Schema.Types.ObjectId , ref : 'Category'},
  ancestors : [{type : mongoose.Schema.Types.ObjectId , ref : 'Category'}],
  children : [{type : mongoose.Schema.Types.ObjectId, ref : 'Category'}]
},{collection : 'Category'});

categorySchema.methods = {
  addChild : function(child) {
    var that = this;
    child.parent = this._id;
    child.ancestors = this.ancestors.concat([this._id]);
    return this.model('Category').create(child,function(err,children){

        if (err) {
          console.log(err);
          /*res.status(400).json({success : false, message : "Cannot update the parent category"});*/
        }
      console.log(children);
      that.children.push(children._id);
      that.save();
    });
  }
};

categorySchema.plugin(autoIncrement,{ inc_field : 'categoryId'});
categorySchema.plugin(slugs('title'));



categorySchema.pre('save',function(next){
  var category = this;
  if(!category.images || category.images.length == 0) {
    var image = {
      url : 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=Category&w=1100&h=350',
      type : 'carousel',
      width : '1100px',
      height : '350px',
      displayOrder : 1
    };

    category.images.push(image);

    image = {
      url : 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=Category&w=270&h=150',
      type : 'card',
      width : '270px',
      height : '150px',
      displayOrder : 2
    };

    category.images.push(image);
  }

  next();
});

let Category = mongoose.model('Category', categorySchema);
export default Category;
