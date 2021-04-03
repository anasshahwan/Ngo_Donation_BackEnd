const express = require('express');
const router = express.Router();
const authChecker = require('../middleware/auth-checker');
const UsersController = require('../controllers/users');


// get list of users users/
router.get('/', UsersController.get_all_users);




// GET By ID requests to /users/1
router.get('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Get User By ID',
        orderId: req.params.userId
    });
});

// GET By ID requests to /users/1
router.get('/:userId', (req, res, next) => {
   User.findById(req.params.userId, (error, data)=> {
   if (error){
       return next(error)
   }else {
       res.json(data)
   }
})
});

// Delete user by ID /user/userid

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User Was  deleted',
        orderId: req.params.userId
    });
});



module.exports = router;
