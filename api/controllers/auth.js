const User = require('../Models/User');
const UserProfile = require('../Models/UserInformation');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .populate('role','type')
      .exec()
      .then(user => {
        if (user < 1) {
          return res.status(401).json({
            message: "Sorry! We can't find your email in our database record."
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Your Password Dosent Match"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
              'secret',
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              _id:user._id,
              firstname:user.firstname,
              lastname:user.lastname,
              email:user.email,
              role:user.role,         
              token: token,
              
            });
          }
          res.status(401).json({
            message: "Your Password dosent Match."
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } //End Export  Login In 


exports.register = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email: req.body.email,
                password: hash,
                role:req.body.role, 
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  
                  const userprofile = new UserProfile({
                    _id: new mongoose.Types.ObjectId(),
                    user_id:result._id,
                    cma:"",
                    phone_number:"",
                    address:"",
                    city:"",
                    state:"",
                    zip_code:"",
                    country:""
                     
                
                  });

          userprofile.save().then(res=>{
            console.log("Was Added")

            console.log(res)
          },).catch(err=>console.log(err));
// ADd          





                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  }