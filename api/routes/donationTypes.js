const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const DonationTypeController = require('../controllers/donationType');

//create a donation type '/donationTypes/addDonType'
router.post('/addDonType', DonationTypeController.add_donation_type)


//get all donation types  '/donationTypes'
router.get('/', DonationTypeController.get_all_donation_types);


// get donation type by id '/donationTypes/:donTypeId'
router.get('/:donTypeId', function(req, res, next) {
    var id = req.params.donTypeId
    models.DonationType.findById(id)
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

    

//Edit donation type by Id  '/donationTypes/:donTypeId'
router.put("/:donTypeId", DonationTypeController.update_donation_type);

//Delete donation type by Id '/donationTypes/:donTypeId'
router.delete("/:donTypeId", DonationTypeController.update_donation_type);

module.exports = router;