import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type : String, unique: true, trim: true},
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  firstName:String,
  lastName:String,
  gender:String,
  phone:String,
  contact: { address1 : String, address2 : String,city : String,state:String,zip : Number,country: String},
  role: { type : String, default : "client" },
  insertedOn : {type : Date, default: Date.now}
});
/*
userSchema.index({username : 1,email : -1});*/

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
