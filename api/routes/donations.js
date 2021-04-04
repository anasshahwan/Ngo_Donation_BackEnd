const express = require('express');
const router = express.Router();
const DonationsController = require('../controllers/donations');
const Donation = require('../Models/Donation');

//get all donations  '/donations'
router.get('/', DonationsController.get_all_donations);
router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (error, data)=> {
    if (error){
        return next(error)
    }else {
        res.json(data)
    }
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