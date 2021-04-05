const Donation = require('../Models/Donation');
const User = require('../Models/User');
const { Mongoose } = require('mongoose');

exports.get_all_donations = (req, res, next) => {
    Donation.find()
    .populate('donType', 'donName' )
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
}


exports.create_donation = (req, res, next) => {
    const DonationModel = new Donation({
        _id: new Mongoose.types.ObjectId(),
        userId : req.body.userId,
        amount : req.body.amount,
        donType: req.body.donType,
        dateCreated: req.body.dateCreated
    });
    DonationModel.save().then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
    res.status(201).json({
        message: 'Donation was created successfully'
    });
};