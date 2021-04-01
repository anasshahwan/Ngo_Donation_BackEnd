const express = require('express');
const router = express.Router();


 // Log in 
router.post('/login', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'User was  Logged In '
    });
});




// Log out 
router.post('/logout', (req, res, next) => {
    res.status(201).json({
        message: 'User has Been Logged Out '
    });
});

module.exports = router;