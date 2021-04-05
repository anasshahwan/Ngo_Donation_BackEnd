const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const DonationsController = require('../controllers/donations');
const Donation = require('../Models/Donation');

//get all donations  '/donations'
router.get('/', DonationsController.get_all_donations);


//get donations by id  '/donations/'
router.get('/:id', (req, res, next) => {
    var id = req.params.id
    models.Donation.findById(id)
    .lean().exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});


//add donation '/donations/addDonation'
// router.post('/addDonation', DonationsController.create_donation);
router.post('/addDonation', (req, res, next) => {
    Donation.create(req.body, (error, data) => {
        if (error){
            return next(error)
        }else {
            res.json(data)
        }
    })    

});

module.exports = router;