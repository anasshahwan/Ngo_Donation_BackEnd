const Role = require('../Models/Role');
const mongoose = require("mongoose");


exports.get_all_roles =(req, res, next) => {
    Role.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
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


exports.delete_role = (req, res, next) => {
    const id = req.params.roleId;
    console.log(id)
    Role.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }


  exports.add_new_role =  (req, res, next) => {
    
       const  RoleModel = new Role({
        _id : new mongoose.Types.ObjectId(),
        type : req.body.type
    });

    RoleModel.save().then(result=>{
        console.log("Addedd");
        
    }).catch(err=>{
        console.log(err);
    })
    res.status(201).json({
        message: 'Roles was ' + req.body.type
    });
    
};