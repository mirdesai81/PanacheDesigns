import Category from "../models/category";
import BaseCtrl from "./base";
import * as mongoose from 'mongoose';
import * as multer from 'multer';
import * as sharp from 'sharp';
import * as GridFsStorage from 'multer-gridfs-storage';
import * as multiparty from 'multiparty'
var Grid = require('gridfs-stream');
const connection = mongoose.connection;

class CategoryCtrl extends BaseCtrl {
  model = Category;
  identityField : string = 'slug';

  uploadFile = (req,res) => {
    let gfs = req.app.get("gridfs-settings");
/*    let upload = req.app.get("multer-settings");
    upload(req,res,err => {

      if(err) {
        res.json({success : false, message : err});
        return;
      }

      res.json({success : true, message : req.file.filename});

    });*/


    var form = new multiparty.Form();
    var context = {};
    form.on('field', function(name, value){
      context[name] = value;
      console.log(context);
    });

    form.on('part', function(part){
      // handle events only if file part
      if (!part.filename) { return; }

      let timestamp = Date.now();
      let generatedFilename = `image-${timestamp}-${part.filename}`;

      var options =
      {
        filename: generatedFilename,
        metadata: context,
        mode: 'w',
        root: 'ctFiles'
      };
      var ws = gfs.createWriteStream(options);

      // success GridFS
      ws.on('close', function (file) {
        console.log(file.filename);
        res.json({success : true, message : file.filename});
      });

      // error GridFS
      ws.on('error', function (errMsg) {
        console.log('An error occurred!', errMsg);
        res.json({success : false, message : errMsg});
      });

      const transformer = sharp().resize(250,null,
        { kernel : sharp.kernel.nearest,
          interpolator : sharp.interpolator.nearest
        })
        .max()
        .on('info',function(info){console.log(info)});

      part.pipe(transformer).pipe(ws);
    });

    // Close emitted after form parsed
    form.on('close', function() {
      console.log('Upload completed!');
    });

    form.parse(req);

  };


  getFile = (req,res) => {
    let gfs = req.app.get("gridfs-settings");
    gfs.collection("ctFiles"); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){

      if(err) {
        console.log(err);
      }

      if(!files || files.length === 0){
        return res.status(404).json({
          success: false,
          message: req.params.filename
        });
      }
      /** create read stream */
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: "ctFiles"
      });

/*      const transformer = sharp().resize(300,150)
                            .max().on('info',function(info){console.log(info)});*/

      /** set the proper content type */
      res.set('Content-Type', files[0].contentType);
      /** return response */
      return readstream.pipe(res);
    });
  };

  deleteFile = (req,res) => {
    let gfs = req.app.get("gridfs-settings");

    gfs.remove({
      filename : req.params.filename,
      root : "ctFiles"
    }, function (err) {
      if(err) {
        res.status(400).json({success : false, message : err});
        return;
      }

      console.log(req.params.filename);
      res.status(200).json({success : true, message : req.params.filename});
    });

  };


  // Get all
  getAllByPath = (req, res) => {

    this.model.find({path : /^,Home,/}).populate('ancestors children').exec((err,docs) => {
      if (err) { console.error(err); throw err; }
      console.log(docs);
      res.json(docs);
    });
  };

  // Get all
  getAll = (req, res) => {

    if(req.query.path) {
      var query = new RegExp(`^,${req.query.path},$`,'i');
      this.model.find({path : query}).populate('ancestors children').exec((err,docs) => {
        if (err) { console.error(err); throw err; }
        console.log(docs);
        res.json(docs);
      });
    } else {
      this.model.find({}).populate('ancestors children').exec((err,docs) => {
        if (err) { console.error(err); throw err; }

        res.json(docs);
      });
    }


  };

  insert = (req, res) => {
    var parent = req.body.parent || null;

    if(parent) {
      this.model.findOne({_id : parent}).then( category => {
        return category.addChild(req.body);
      }).then(child => {
        return res.status(200).json(child);
      }).catch(err => {
        if (err && err.code === 11000) {
          res.status(400).json({success : false, message : "Cannot insert duplicate key for category"});
        }
        if (err) {
          console.log(err);
          res.status(400).json({success : false, message : "Cannot insert category"});
        }
      });
    } else {
      const obj = new this.model(req.body);
      obj.save((err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          res.status(400).json({success : false, message : "Cannot insert duplicate key for category"});
        }
        if (err) {
          console.log(err);
          res.status(400).json({success : false, message : "Cannot insert category"});
        }
        res.status(200).json(item);
      });
    }
  };

  delete = (req, res) => {
    var query = {};
    query[this.identityField] = req.params.id;
    this.model.findOneAndRemove(query, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };
}

export default CategoryCtrl;
