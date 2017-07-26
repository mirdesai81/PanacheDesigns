import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import UserCtrl from './controllers/user';
import User from './models/user';
import CategoryCtrl from "./controllers/category";
import config from './config';

function isAuthenticated(req,res,next){

  var token = req.headers['Authorization'];

  if(req.headers && req.headers['Authorization']) {
    var token = req.headers['Authorization'].split(' ')[1];
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

export default function setRoutes(app) {

  const router = express.Router();
  const authRouter = express.Router();
  const userCtrl = new UserCtrl();
  const categoryCtrl = new CategoryCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/user').post(userCtrl.insert);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Category
  router.route('/categories').get(categoryCtrl.getAll);
  router.route('/categories/count').get(categoryCtrl.count);
  authRouter.use(isAuthenticated).route('/category').post(categoryCtrl.insert);
  router.route('/category/:id').get(categoryCtrl.get);
  authRouter.use(isAuthenticated).route('/category/:id').put(categoryCtrl.update);
  authRouter.use(isAuthenticated).route('/category/:id').delete(categoryCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
  app.use('/api',authRouter);

}


