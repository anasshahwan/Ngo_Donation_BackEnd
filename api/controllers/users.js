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

exports.delete_user = (req, res, next) => {
  const id = req.params.userId;
  console.log(id)
  User.remove({_id:id})
     .exec()
     .then(result => {
       res.status(200).json(result);
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({
         error:err
       });
     });
}
