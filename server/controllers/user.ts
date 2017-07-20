import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ username: req.body.username }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, "eatfreshforlife"); // , { expiresIn: 10 } seconds
        res.status(200).json({ username : user.username , firstName : user.firstName, lastName : user.lastName, token: token });
      });
    });
  };

}
