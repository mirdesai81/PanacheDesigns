import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';
import config from '../config';
export default class UserCtrl extends BaseCtrl {
  model = User;
  identityField = 'userId';

  login = (req, res) => {
    this.model.findOne({ userName: req.body.userName }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, config.secret,{expiresIn : '1h'}); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  };

}
