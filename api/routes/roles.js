const express = require('express');
const RolesController = require('../controllers/roles');
const router = express.Router();

// Add New Role 
router.post('/add', RolesController.add_new_role);

// Get All Roles 
router.get('/', RolesController.get_all_roles );

// Delete  a Role 
router.delete("/delete/:roleId", RolesController.delete_role );


module.exports = router;