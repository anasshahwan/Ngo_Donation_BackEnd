const express = require('express');
const router = express.Router();
const DonationTypeController = require('../controllers/donationType');

//create a donation type '/donationTypes/addDonType'
router.post('/addDonType', DonationTypeController.add_donation_type)


//get all donation types  '/donationTypes'
router.get('/', DonationTypeController.get_all_donation_types);


// get donation type by id '/donationTypes/:donTypeId'
router.get('/:donTypeId', (req, res, next) => {
    DonationType.findById(req.params.donTypeId, (error, data) => {
        if (error){
            return next(error)
        }else {
            res.json(data)
        }
    });
});

//Edit donation type by Id  '/donationTypes/:donTypeId'
router.put("/:donTypeId", DonationTypeController.update_donation_type);

//Delete donation type by Id '/donationTypes/:donTypeId'
router.delete("/:donTypeId", DonationTypeController.update_donation_type);

module.exports = router;