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


const app = express();
dotenv.load({path : '.env'});
app.set('port', (process.env.PORT || 3000));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../public')));
/*app.use('/', express.static(path.join(__dirname, 'dist')));*/

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

// mongodb
//console.log(process.env.MONGODB_URL);
mongoose.connect("mongodb://127.0.0.1/ecommerce");
const db = mongoose.connection;
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

db.on('error', console.error.bind(console, 'connection error:'));
/*db.once('open', () => {
  console.log('Connected to MongoDB');


  });*/
setRoutes(app);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Angular Full Stack listening on port ' + app.get('port'));
});
export { app };
