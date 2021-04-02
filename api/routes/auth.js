const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth')


// Create a New User   http://localhost:3000/auth/register
router.post("/register", AuthController.register);

 // Log in 
 router.post("/login", AuthController.login);

// Log out 
router.post('/logout', (req, res, next) => {
    console.log(req.headers.authorization.split(' ')[1])
    // req.user.deleteToken(req.token,(err,user)=>{
    //     if(err) return res.status(400).send(err);
    //     res.sendStatus(200);
    // });
    // req.user.deleteToken(req.token,(err,user)=>{
    //     if(err) return res.status(400).send(err);
    //     res.sendStatus(200);
    // });

});

module.exports = router;