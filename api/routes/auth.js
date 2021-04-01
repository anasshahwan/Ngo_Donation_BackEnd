const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth')
// Create a New User 

router.post("/register", AuthController.register);

 // Log in 
 router.post("/login", AuthController.login);



// Log out 
router.post('/logout', (req, res, next) => {
    res.status(201).json({
        message: 'User has Been Logged Out '
    });
});

module.exports = router;