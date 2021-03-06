const express = require('express');
const router = express.Router();
const authChecker = require('../middleware/auth-checker');
const UsersController = require('../controllers/users');
const User = require('../Models/User');


// get list of users users/
router.get('/', UsersController.get_all_users);


router.get('/pagination', UsersController.get_all_users_pagination);

router.get('/userinformation/:userId', UsersController.get_user_informationByID);
router.put('/updateuserinfo/:userId', UsersController.updateUserInformationById);


// GET By ID requests to /users/1
router.get('/:userId', UsersController.get_userByID);

// Edit user By Id  /user/userid
router.put("/:userId", UsersController.update_user);

// GET By ID requests to /users/1
router.get('/:userId', UsersController.get_userByID);

// Delete user by ID /user/userid
router.delete("/:userId", UsersController.delete_user );


module.exports = router;
