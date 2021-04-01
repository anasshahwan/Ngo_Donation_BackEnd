const User = require('../Models/User');

exports.get_all_users = (req, res, next) => {

    User.find()
    .populate('role','type')
    .exec()
    .then(docs => {
        res.status(200).json(docs);           
      })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}