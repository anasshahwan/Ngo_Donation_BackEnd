const User = require('../Models/User');
const mongoose =require('mongoose')

exports.get_all_users = (req, res, next) => {

    User.find()
    .populate('role','type')
    .exec ()
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


exports.update_user = (req, res, next) => {
  const id = req.params.userId;
  console.log(id)
  User.findOneAndUpdate({_id:id}, 
    {
      $set: {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
    })
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


exports.get_userByID = (req, res, next) => {

  User.findById(req.params.userId)
  .populate('role','type')
  .exec()
  .then(docs => {
    console.log(docs);
    //   if (docs.length >= 0) {
    res.status(200).json({
        
      message: 'User Details',
      _id: new mongoose.Types.ObjectId(),
              firstname:docs.firstname,
              lastname:docs.lastname,
              email: docs.email,
              role:docs.role, 
    });
    //   } else {
    //       res.status(404).json({
    //           message: 'No entries found'
    //       });
    //   }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });


};
