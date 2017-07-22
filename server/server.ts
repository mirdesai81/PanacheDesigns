/**
 * Created by Saloni on 1/3/2017.
 */
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as Q from 'Q';
import setRoutes from './routes';
import * as json from 'jsonfile';
import Category from '../server/models/category';
import User from '../server/models/user';
const app = express();
dotenv.load({path: '.env'});
app.set('port', (process.env.PORT || 3000));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../public')));
/*app.use('/', express.static(path.join(__dirname, 'dist')));*/

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

// mongodb
//console.log(process.env.MONGODB_URL);
mongoose.connect("mongodb://127.0.0.1/ecommerce");
const connection = mongoose.connection;
(<any>mongoose).Promise = Q.Promise;

/*// Set our api routes
 app.use('/api', api);

 // Catch all other routes and return the index file
 app.get('*', function(req, res) {
 res.sendFile(path.join(__dirname, 'dist/index.html'));
 });

 /!**
 * Get port from environment and store in Express.
 *!/
 const port = process.env.PORT || '3000';
 app.set('port', port);

 /!**
 * Create HTTP server.
 *!/
 const server = http.createServer(app);

 /!**
 * Listen on provided port, on all network interfaces.
 *!/
 server.listen(port, function() { console.log('API running on localhost:' + port); });*/

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
  var dataPath = path.join(__dirname,'data');
  connection.db.listCollections({name : 'User'}).next(function(err,collectionInfo){
    if(!collectionInfo) {
      connection.db.dropCollection('User', function (err, result) {
        if (err) {
          console.log("Could not drop 'User' collection");
        }
      });

      var userPath = path.join(dataPath,'User.json');
      json.readFile(userPath, function (err, obj) {
        if (err) {
          console.log(err);
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
  });

  connection.db.listCollections({name : 'Category'}).next(function(err,collectionInfo){
    if(!collectionInfo) {
      connection.db.dropCollection('Category', function (err, result) {
        if (err) {
          console.log("Could not drop 'Category' collection");
        }
      });

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
