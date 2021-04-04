const express = require('express');
const router = express.Router();
const authChecker = require('../middleware/auth-checker');
const UsersController = require('../controllers/users');
const User = require('../Models/User');

// get list of users users/
router.get('/', UsersController.get_all_users);

// GET By ID requests to /users/1
router.get('/:userId', UsersController.get_userByID);


// Edit user By Id  /user/userid
router.put("/:userId", UsersController.update_user);



module.exports = router;
