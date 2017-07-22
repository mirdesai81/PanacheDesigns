abstract class BaseCtrl {

  abstract model: any;
  abstract identityField : any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { console.error(err); throw err; }
      console.log(docs);
      res.json(docs);
    });
  };

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { console.error(err); throw err; }
      res.json(count);
    });
  };

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

  // Get by id
  get = (req, res) => {
    var query = {};
    query[this.identityField] = req.params.id;
    this.model.findOne(query, (err, obj) => {
      if (err) { console.error(err); throw err; }
      res.json(obj);
    });
  };

  // Update by id
  update = (req, res) => {
    var query = {};
    query[this.identityField] = req.params.id;
    this.model.findOneAndUpdate(query, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };

  // Delete by id
  delete = (req, res) => {
    var query = {};
    query[this.identityField] = req.params.id;
    this.model.findOneAndRemove(query, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };
}

export default BaseCtrl;
