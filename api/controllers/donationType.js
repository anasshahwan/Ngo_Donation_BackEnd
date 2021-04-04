const DonationType = require('../Models/DonationType');
const mongoose = require("mongoose");


exports.get_all_donation_types = (req, res, next) => {
    DonationType.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.add_donation_type = (req, res, next) => {
       const DonationTypeModel = new DonationType({
        _id: new mongoose.Types.ObjectId(),
        donName: req.body.donName,
        isActive: req.body.isActive
    });

    DonationTypeModel.save().then(result => {
        console.log("Successfully created donation type.")
    })
    .catch(err => {
        console.log(err);
    })
    res.status(201).json({
        message: 'Successfully created donation: ' + req.body.donName
    });
};

//updates donation type info
exports.update_donation_type = (req, res) => {
    const id = req.params.donTypeId;
    console.log(id)
    DonationType.findOneAndUpdate({_id:id},
    {
        $set: {
            donName: req.body.donName,
            isActive: req.body.isActive
        }
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

//deletes donation type
exports.delete_donType = (req, res, next) => {
    const id = req.params.donTypeId;
    console.log(id)
    DonationType.remove({_id:id})
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