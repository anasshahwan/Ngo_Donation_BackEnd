const User = require('../Models/User');
const mongoose =require('mongoose')
const UserInformations = require('../Models/UserInformation');

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



exports.get_all_users_pagination = (req, res, next) => {
  const pagination = 5;
  const  page = parseInt(req.query.page);

  User.find().skip((page-1) * pagination).limit(pagination)
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



exports.get_user_informationByID = (req, res, next) => {
  console.log(req.params.userId);
 UserInformations.findOne({user_id:req.params.userId})
 .populate('user_id','firstname lastname email')
  .exec()
  .then(docs => {
    res.status(200).json({
        
      message: 'User Profile',
              cma:docs.cma,
              phone_number:docs.phone_number,
              address: docs.address,
              city:docs.city, 
              state:docs.state,
              zip_code:docs.zip_code,
              country:docs.country,
              user_id:docs.user_id

    });
  
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

}

exports.updateUserInformationById = (req, res, next) => {


  const id = req.params.userId;
  console.log(id)
  UserInformations.findOneAndUpdate({user_id:id}, 
    {
      $set: {
        cma:req.body.cma,
        phone_number:req.body.phone_number,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country:req.body.country,

      }
    })
     .exec()
     .then(result => {
       res.status(200).json({
         message:"Record Was Updated Successfully"
       });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({
         error:err
       });
     });

}