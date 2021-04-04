const express = require('express');
const router = express.Router();
const authChecker = require('../middleware/auth-checker');
const UsersController = require('../controllers/users');
const User = require('../Models/User');


// get list of users users/
router.get('/', UsersController.get_all_users);


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


// Edit user By Id  /user/userid
router.put("/:userId", UsersController.update_user);


// Delete user by ID /user/userid
router.delete("/:userId", UsersController.delete_user );


module.exports = router;