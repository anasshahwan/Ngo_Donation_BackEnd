const express = require('express');
const router = express.Router();


// Handle incoming GET requests to /users
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get All Users ... '
    });
});

// Handle incoming GET By ID requests to /users/1
router.get('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Get User By ID',
        orderId: req.params.userId
    });
});

// Edit user By Id  /user/userid
router.put('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User Was  Updated',
        orderId: req.params.userId
    });
});


// Delete user by ID /user/userid

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User Was  deleted',
        orderId: req.params.userId
    });
});



module.exports = router;