const express= require('express');
const { loginController, registerController } = require('../controllers/userController');

//router object
const router= express.Router()

//router
//Post||login User
router.post('/login',loginController)

// Post || register User
router.post('/register',registerController)

//export
module.exports=router