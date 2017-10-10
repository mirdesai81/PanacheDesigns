import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import UserCtrl from './controllers/user';
import User from './models/user';
import CategoryCtrl from "./controllers/category";
import config from './config';
import * as Grid from 'gridfs-stream';
import ProductsCtrl from "./controllers/products";


function isAuthenticated(req,res,next){
  if(req.method === 'OPTIONS') {
    next();
  } else {
    var token = req.headers['Authorization'] || req.headers['authorization'] ;

    if(token) {
      /*var token = req.headers['Authorization'].split(' ')[1];*/
      jwt.verify(token,config.secret,function(error,decode){
        if(error) {
          return res.json({success : false, message : 'Failed to authenticate token.'});
        }
        req.user = decode;
        next();
      });
    } else {
      return res.status(403).send({success : false, message : 'token missing'});
    }
  }

}

export default function setRoutes(app) {

  const router = express.Router();
  const authRouter = express.Router();
  const userCtrl = new UserCtrl();

  const categoryCtrl = new CategoryCtrl();
  const productsCtrl = new ProductsCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/user').post(userCtrl.insert);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //  Category API

  /* router.route('/categories/path').get(categoryCtrl.getAllByPath); */
  router.route('/categories').get(categoryCtrl.getAll);
  router.route('/categories/count').get(categoryCtrl.count);
  authRouter.use(isAuthenticated).route('/category').post(categoryCtrl.insert);
  router.route('/category/:id').get(categoryCtrl.get);
  authRouter.use(isAuthenticated).route('/category/:id').put(categoryCtrl.update);
  authRouter.use(isAuthenticated).route('/category/:id').delete(categoryCtrl.delete);
  authRouter.use(isAuthenticated).route('/category/upload').post(categoryCtrl.uploadFile);
  router.route('/category/file/:filename').get(categoryCtrl.getFile);
  router.route('/category/file/:filename').delete(categoryCtrl.deleteFile);

  //  Products API
  router.route('/products').get(productsCtrl.getAll);
  router.route('/products/count').get(productsCtrl.count);
  authRouter.use(isAuthenticated).route('/product').post(productsCtrl.insert);
  router.route('/product/:id').get(productsCtrl.get);
  router.route('/product/search').get(productsCtrl.search);
  authRouter.use(isAuthenticated).route('/product/:id').put(productsCtrl.update);
  authRouter.use(isAuthenticated).route('/product/:id').delete(productsCtrl.delete);
  authRouter.use(isAuthenticated).route('/product/upload').post(productsCtrl.uploadFile);
  router.route('/product/file/:filename').get(productsCtrl.getFile);
  router.route('/product/file/:filename').delete(productsCtrl.deleteFile);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
  app.use('/api',authRouter);

}


