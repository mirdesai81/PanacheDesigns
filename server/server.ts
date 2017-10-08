/**
 * Created by Saloni on 1/3/2017.
 */
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as Q from 'q';
import setRoutes from './routes';
import * as json from 'jsonfile';
import Category from '../server/models/category';
import User from '../server/models/user';
import config from './config';
import * as Grid from 'gridfs-stream';
import * as multer from 'multer';
import * as GridFsStorage from 'multer-gridfs-storage';
const app = express();
dotenv.load({path: '.env'});
app.set('port', (process.env.PORT || 4000));
app.set('secret',config.secret);
// Point static path to dist
app.use(express.static(path.join(__dirname, '../public')));


// Parsers for POST data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));


app.all('*',function(req,res,next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, X-Requested-With, Content-Type, Accept, charset');

/*  // Request methods you wish to allow
  res.setHeader('ALLOW', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');*/

  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// mongodb
//console.log(process.env.MONGODB_URL);
mongoose.connect(config.db);
const connection = mongoose.connection;
(<any>mongoose).Promise = Q.Promise;
Grid.mongo = mongoose.mongo;
let gfs = Grid(connection.db);
app.set("gridfs-settings",gfs);

var storage = GridFsStorage({
  url : config.db,
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  },
  metadata: function(req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: "ctFiles" //root name for collection to store files into
});
var upload =  multer({ //multer settings for single upload
  storage: storage
}).single('file');

app.set("storage-settings",storage);
app.set("multer-settings",upload);

function addCategory(dataPath) {
  var categoryPath = path.join(dataPath,'Category.json');
  json.readFile(categoryPath, function (err, docs) {
    if (err) {
      console.log(err);

      return;
    }

    docs.forEach(doc => {
      var category = new Category(doc);
      category.save(function(err,data){
        if(err) {
          console.log("Category Insert Failed");
          console.log(err);

        }
      });
    });
  });
}

function addUser(dataPath) {
  var userPath = path.join(dataPath,'User.json');
  json.readFile(userPath, function (err, obj) {
    if (err) {
      console.log(err);
      return;
    }

    var user = new User(obj);
    user.save(function(err,doc){
      if (err) {
        console.log("User Insert Failed");
        console.log(err);
      }
    });

  });
}
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
  var dataPath = path.join(__dirname,'data');
  connection.db.listCollections({name : 'User'}).next(function(err,collectionInfo){

    if(!collectionInfo) {
     addUser(dataPath);
    } else {
      console.log("User already defined");
      User.count({},function(err,count){
        if(err) {
          console.log(err);
          return;
        }

        if(count === 0) {
          addUser(dataPath);
        }
      });
    }
  });

  connection.db.listCollections({name : 'Category'}).next(function(err,collectionInfo){
    if(!collectionInfo) {
      addCategory(dataPath);
    } else {
      console.log("Category already defined");
      Category.count({},function(err,count){
        if(err) {
          console.log(err);
          return;
        }

        if(count === 0) {
          addCategory(dataPath);
        }
      });
    }
  });


});


setRoutes(app);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Angular Full Stack listening on port ' + app.get('port'));
});
export { app };
