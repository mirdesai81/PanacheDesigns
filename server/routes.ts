import * as express from 'express';


import UserCtrl from './controllers/user';
import User from './models/user';
import CategoryCtrl from "./controllers/category";

export default function setRoutes(app) {

  const router = express.Router();
  const userCtrl = new UserCtrl();
  const categoryCtrl = new CategoryCtrl();


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Category
  router.route('/categories').get(categoryCtrl.getAll);
  router.route('/categories/count').get(categoryCtrl.count);
  router.route('/category').post(categoryCtrl.insert);
  router.route('/category/:id').get(categoryCtrl.get);
  router.route('/category/:id').put(categoryCtrl.update);
  router.route('/category/:id').delete(categoryCtrl.delete);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
