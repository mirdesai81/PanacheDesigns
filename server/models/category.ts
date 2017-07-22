import * as mongoose from 'mongoose';
import * as autoIncrement from 'mongoose-sequence';

/*{id: '1', title: 'Bread & Bakery',
  imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
  imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
  desc: 'The best cupcakes, cookies, cakes, pies, cheesecakes, fresh bread, biscotti, muffins, bagels, fresh coffee and more.' }*/

const categorySchema = new mongoose.Schema({
  title : { type : String, unique : true},
  imageL : String,
  imageS : String,
  desc : String
},{collection : 'Category'});

categorySchema.plugin(autoIncrement,{ inc_field : 'categoryId'});


categorySchema.pre('save',function(next){
  var category = this;
  category.imageS = "https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150";
  category.imageL = "https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350";
  next();
});

let Category = mongoose.model('Category', categorySchema);
export default Category;
